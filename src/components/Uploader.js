import './uploader.css'
import React, {useEffect, useState} from 'react'
import CleanupButton from './cleanupbtn';
import { AiOutlineCloudUpload } from "react-icons/ai";
import Words from './Words';
import './uploader.css'
import { BounceLoader } from "react-spinners";

const Uploader = () => {
  const [message, setMessage] = useState("Loading");
  const [selectedFile, setSelectedFile] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [vttFile, setVttFile] = useState();

  // Variables to store the uploaded file
  const [uploadedFileUrl, setUploadedFileUrl] = useState(); // New state variable

  // Sending file to server for it to generate captions
  const handleFileChange = (event) => {
    console.log(uploadedFileUrl);  // This will log the value of uploadedFileUrl to the console
    // Getting uploaded file
    const file = event.target.files[0];
    setSelectedFile(file);

    // Create a local URL for the uploaded file
    const url = URL.createObjectURL(file);
    setUploadedFileUrl(url);

    // Sending file to server
    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('http://localhost:8080/api/convert', {
      method: 'POST',
      body: formData
    })
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      return blob.text();
    })
    .then(text => {
      setVttFile(text);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  // Get uploading progress in variable (in percents)
  const [uploading, setUploading] = useState(false); // New state variable
  const [isLoading, setIsLoading] = useState(false);
  // Sending files on server to generate captions
  const handleFileUpload = () => {
    // setUploading(false); // Set uploading to true at the start of the upload
    setIsLoading(true);

    // Sending file to server
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    fetch('http://localhost:8080/api/convert', {
      method: 'POST',
      body: formData
    })
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      return blob.text();
    })
    .then(text => {
      setVttFile(text);
    })
    .catch((error) => {
      console.error('Error:', error);
      setUploading(false); // Set uploading to false if an error occurs
    });
    
  }

  useEffect(()=>{
    fetch("http://localhost:8080/api/home")
      .then((response) => response.json())
      .then((data)=>{
        setMessage(data.message);
      })
  }, [])

  return (
    <div className='w-[100%] h-full flex flex-col items-center justify-center gap-y-6'>
      {!videoUrl ? (
        <div className='uploader w-full h-full flex flex-col items-center justify-center'>
          <h1 className='font-bold text-3xl mx-auto mb-5'>Upload your video</h1>

          {/* Upload form with progress bar */}
          {!uploadedFileUrl ? (
            <div>
              <input 
              type="file" 
              id="fileUpload"
              accept='video/*'
              onChange={handleFileChange}
              style={{ display: 'none' }}
              />
              <label htmlFor="fileUpload" className='w-[50vw] gap-y-2 bg-[#953AE7]/5 cursor-pointer border-dashed border-4 border-[#953AE7] h-[30vw] rounded-3xl drop-shadow-2xl flex items-center justify-center flex-col'>
                  <AiOutlineCloudUpload size={50} color='#953AE7' className='flex p-2 rounded-2xl bg-[#ffffff]'/>
                  <p className='flex flex-row gap-x-1'><h1 className='text-[#953AE7]'>Click to upload</h1> or drag on drop</p>
              </label>
            </div>
          ) : (
            <div className='h-[70%]'>
              {isLoading ? (
                <div className='w-full h-full'>
                  <video src={uploadedFileUrl} controls className='h-full w-full rounded-2xl'/>
                  <div className="fixed inset-0 flex items-center justify-center bg-[#0A0015]/95 flex flex-col itemms-center justify-center gap-y-6">
                    <BounceLoader color="#953AE7" size={160} />
                    <h1 className='text-white'>
                      Generating subtitles
                      <span className="dot">.</span>
                      <span className="dot delay-1">.</span>
                      <span className="dot delay-2">.</span>
                    </h1>
                  </div>
                </div>              
              ) : (
                <div className='w-full h-full'>
                  <video src={uploadedFileUrl} controls className='h-full w-full rounded-2xl'/>
                </div>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className='w-fit flex flex-row gap-x-2 mx-auto'>
            <button className='bg-[#953AE7] hover:bg-[#953AE7]/60 text-white p-4 mt-5 rounded-full mx-auto' onClick={handleFileUpload}>Generate</button>
            <CleanupButton/>
          </div>
        </div>
      ) : (
        <Words videoUrl={videoUrl}/>
      )}
    </div>
  )
}

export default Uploader