import React, { useEffect, useState, useRef } from 'react';
import './words.css'
import parse from 'html-react-parser';
import axios from 'axios';

function Words (props) {
  console.log(props.uploadedFileUrl);
  const [cues, setCues] = useState([]);
  const [currentCue, setCurrentCue] = useState('');
  const [videoUrl, setVideoUrl] = useState();

  // Check if requestData is null or undefined


  useEffect(() => {
    // Fetch the VTT file from the server
    fetch('http://localhost:8080/api/subtitles')
      .then(response => response.text())
      .then(data => {
        // Parse the VTT file
        const vttCues = data.split('\n\n').slice(1).map(cue => {
          const [time, text] = cue.split('\n');
          const [start, end] = time.split(' --> ').map(t => parseFloat(t.split(':').reduce((acc, time) => (60 * acc) + +time)));
          return { start, end, text };
        });

        // Set the cues in the state
        setCues(vttCues);
      });
  }, []);

  useEffect(() => {
    // Update the current cue every second
    const interval = setInterval(() => {
      const currentTime = document.querySelector('video').currentTime;
      const cue = cues.find(({ start, end }) => currentTime >= start && currentTime <= end);
      setCurrentCue(cue ? cue.text : '');
    }, 1000);

    return () => clearInterval(interval);
  }, [cues]);

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRewind = () => {
    videoRef.current.currentTime -= 10;
  };

  const handleFastForward = () => {
    videoRef.current.currentTime += 10;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current) {
        setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleExport = async () => {
    const response = await fetch('http://localhost:3000/api/export', { method: 'POST' });
    const data = await response.text();
    console.log(data);
  };  

  return (
    <div className='flex flex-col items-center justify-center gap-y-5'>
      <div className="video-container items-center justify-center rounded-2xl" >
        {/* Video layer */}
        <div className='video-layer'>
          {/* Source Video */}
          <video ref={videoRef}>
            <source className='source_video' src={props.videoUrl} type="video/mp4" />
          </video>
          {/* Captions Container */}
          <div className="captions bg-[#000000]/50 absolute inset-[0px] w-full h-full flex flex-col items-center justify-center text-white">
            <div className='line-limit flex gap-x-2 justify-center w-3/4 max-w-3/4 flex-wrap font-bold text-2xl' style={{fontSize: '20px'}}>
              {currentCue.split(' ').map((word, index) => (
                <span 
                  key={index}
                >
                  {word} 
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Controls layer */}
        <div className="controls-layer absolute bottom-0 w-full flex justify-center gap-x-5 p-4 bg-black bg-opacity-50">
          <button onClick={handlePlayPause} className='p-2 px-4 bg-[#000000] text-white rounded-2xl' style={{width: '100px'}}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button onClick={handleRewind} className='p-2 px-4 bg-[#000000] text-white rounded-2xl' style={{width: '100px'}}>Rewind</button>
          <button onClick={handleFastForward} className='p-2 px-4 bg-[#000000] text-white rounded-2xl' style={{width: '100px'}}>Fast Forward</button>
          <div className="progress-bar bg-gray-300 w-full h-2 rounded-full">
            <div className="progress bg-blue-500 h-2 rounded-full" style={{width: `${progress}%`}}></div>
          </div>
        </div>
      </div>
      <button onClick={handleExport} className='p-3 px-7 bg-[#000000] text-white rounded-2xl'>Export</button>
    </div>
  );

};

export default Words;