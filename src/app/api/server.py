from flask import Flask, send_file, request, jsonify, send_from_directory, redirect, url_for
from flask_cors import CORS
import awsgi
import os
import stat
import subprocess
import base64
import requests
import shutil
import glob
from threading import Timer
from werkzeug.utils import secure_filename
from subprocess import Popen

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app = Flask(__name__, static_folder=UPLOAD_FOLDER)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# Delete files 
def delete_folder_after_delay(delay, folder):
    """Delete the specified folder and its contents after a delay."""
    Timer(delay, lambda: shutil.rmtree(folder, ignore_errors=True)).start()

UPLOAD_FOLDER = './uploads'  # Relative path to the current working directory
mp4 = None
srt = None
status = 'processing'
name= ''

@app.route('/api/upload', methods=['POST'])
def upload():
    global mp4, srt, status
    try:
        # Get the video file from the request
        video = request.files['file']
        video_filename = secure_filename(video.filename)

        # Create a new directory with the filename and save the video file in this new directory
        upload_folder = os.path.join(UPLOAD_FOLDER, os.path.splitext(video_filename)[0])
        os.makedirs(upload_folder, exist_ok=True)

        # Delete all existing files in the directory
        for filename in os.listdir(upload_folder):
            file_path = os.path.join(upload_folder, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)
            except Exception as e:
                print(f'Failed to delete {file_path}. Reason: {e}')

        video_filepath = os.path.join(upload_folder, video_filename)
        video.save(video_filepath)
        
        # Convert the video to audio
        audio_path = os.path.splitext(video_filepath)[0] + '.wav'
        subprocess.run(['ffmpeg', '-i', video_filepath, '-vn', '-ar', '44100', '-ac', '2', '-b:a', '192k', audio_path])

        # Transcribe the audio and save the transcription as an SRT file
        srt_path = audio_path + '.words.srt'
        subprocess.run(['whisper_timestamped', '--model', 'tiny', '--output_dir', upload_folder, audio_path], check=True)
        
        mp4 = video_filepath
        srt = srt_path
        status = 'finish'
        return jsonify({'status': status})
    except Exception as e:
        print(f"Error: {e}")  # Print the error message
        return str(e), 500
    
@app.route('/api/download/video', methods=['GET'])
def download_video():
    global mp4
    if mp4 is None:
        return jsonify({'error': 'Video file not found'}), 404
    return send_file(mp4, as_attachment=True)

@app.route('/api/download/srt', methods=['GET'])
def download_srt():
    global srt
    if srt is None:
        return jsonify({'error': 'SRT file not found'}), 404
    return send_file(srt, as_attachment=True)
    
#  Getting the status of the loading
@app.route('/api/status', methods=['GET'])
def get_status():
    global status
    return jsonify({'status': status})

@app.route('/api/convert', methods=['POST'])
def convert():
    # Get the frames and video URL from the request
    frames = request.json['frames']
    video_url = mp4
    width = request.json['width']
    height = request.json['height']

    # Check if video_url is not None
    if not video_url:
        return jsonify({'error': 'No video url provided'}), 400

    # Check if video_url is a local file path
    if os.path.isfile(video_url):
        video_filepath = video_url
        video_filename = os.path.splitext(os.path.basename(video_filepath))[0]
    else:
        # Download the video file from the URL
        video_response = requests.get(video_url)
        video_filename = 'result'
        video_filepath = os.path.join(UPLOAD_FOLDER, video_filename + '.mp4')
        with open(video_filepath, 'wb') as f:
            f.write(video_response.content)

    # Create a folder with the filename
    output_folder = os.path.join(UPLOAD_FOLDER, video_filename)
    os.makedirs(output_folder, exist_ok=True)

    # Save the frames as images
    for i, frame in enumerate(frames):
        imgdata = base64.b64decode(frame.split(',')[1])
        with open(os.path.join(output_folder, f'frame{i}.png'), 'wb') as f:
            f.write(imgdata)

    # Create a video from the frames
    frames_video_filepath = os.path.join(output_folder, 'frames_video.mov')
    subprocess.run(['ffmpeg', '-framerate', '30', '-i', os.path.join(output_folder, 'frame%d.png'), '-vcodec', 'png', '-vf', f'scale={width}:{height}', frames_video_filepath])

    # Overlay the frames video on top of the input video
    output_filepath = os.path.join(output_folder, 'output.mp4')
    overlay_process = Popen(['ffmpeg', '-i', video_filepath, '-i', frames_video_filepath, '-filter_complex', '[0:v][1:v]overlay=0:main_h-overlay_h', '-c:a', 'copy', '-crf', '18', output_filepath])

    # Wait for the overlay process to finish
    overlay_process.wait()

    # Schedule the deletion of the folder after a delay
    delete_folder_after_delay(0.1, output_folder)

    # Send the output file to the client
    response = send_file(output_filepath, mimetype='video/mp4')

    # return (print('YOUR VIDEO IS RETURNED!!!'), response)
    print('YOUR VIDEO IS RETURNED!!!')
    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8000,debug=True)