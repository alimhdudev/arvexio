import UploadIcon from "../components/UploadIcon";
import axios from "axios";
import {redirect, useRouter} from "next/navigation";
import {useState} from "react";
import {Spinner} from "@nextui-org/react";
import {CircularProgress} from "@nextui-org/react";
import { IoCloudUploadSharp } from "react-icons/io5";
import { motion } from 'framer-motion';
import { incrementApiLimit } from "../../prisma/api-limit";
import { useEffect } from 'react'
import { Mbs } from '../../public/mbs';
import { Constants } from "../../public/constants";
import { checkDescription } from "../../libs/checkdescription";
import { checkSubscription } from "../../libs/subscription";
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";



const UploadForm = ({MEGABYTES,MINUTES}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const handleDragOver = (ev) => {
    ev.preventDefault();
  };
  const handleDragLeave = (ev) => {
    ev.preventDefault();
  };
  const handleDrop = async (ev) => {
    ev.preventDefault();
    const files = ev.dataTransfer.files;
    handleFileUpload(files);
  };
  const handleFileUpload = async (files) => { 
    // await incrementApiLimit();
    const response = await fetch('/api/uploadform', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    });
    
    // Limiting upload by mb
    const file = files[0];
    const maxSize = MEGABYTES * 1024 * 1024; // MEGABYTES MB in bytes
    if (file.size > maxSize) {
      alert('Please upload a file smaller than ' + MEGABYTES + ' MB');
      return;
    }
  
    // Check video duration
    const videoElement = document.createElement('video');
    videoElement.src = URL.createObjectURL(file);
    await new Promise((resolve) => {
      videoElement.onloadedmetadata = () => {
        resolve();
      };
    });
    const durationInSeconds = Math.floor(videoElement.duration);
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    const secondsLimit = 0;
    // console.log('Duration:', minutes, 'minutes', seconds, 'seconds');
    // console.log('Limit minutes:', MINUTES, 'Limit seconds:', secondsLimit);
    if (minutes > MINUTES || (minutes === MINUTES && seconds > secondsLimit)) {
      alert('Uploaded video must be less than ' + MINUTES + ' minutes');
      return;
    }
    
  
    if (response) {
      if (files.length > 0) {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
          // here it sends the video file to the python server
          // and in here we're gonna have the same code for sending in on /export endpoint
          const res = await axios.post('http://127.0.0.1:8000/api/upload', formData, {headers: {'Content-Type': 'multipart/form-data'}});
          const statusRes = await axios.get('http://127.0.0.1:8000/api/status');
          const status = statusRes.data.status;
          if (status === 'finish') {router.replace('/edit', { shallow: true })}

          // so on server if it has gotten the video the status is finish. 
          // and if the status is finish stop the uploading and push client to /edit
        } catch (error) {
          console.error('Error uploading file:', error);
          setIsUploading(false);
        }
      }
    } 
    if (response.status === 403) {
      router.push('/');
    }
    setIsUploading(false);
  };

  return (
    <div
      className="flex items-center justify-center"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        cursor: 'pointer',
        width: '750px',
        height: '450px',
        backgroundColor: '#F8EFFF',
        border: '5px dashed #953AE7',
        borderRadius: '30px',
        margin: 'auto',
      }}
    >
      {isUploading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-black/90 backdrop-blur-md text-white fixed inset-0 flex items-center">
            <div className="w-full text-center flex flex-col items-center">
              <CircularProgress label="" size="lg" color="secondary" labelColor="secondary"/>
              <p className="mt-2">Loading...</p>
            </div>
          </div>
        </motion.div>
      ) : (
        <div>
          <label
            style={{
              width: '730px',
              height: '430px',
              borderRadius: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
            htmlFor="fileInput"
            className="cursor-pointer"
          >
            <IoCloudUploadSharp color="#953AE7" size={40}/>
            <p style={{marginTop: 10, color: '#953AE7'}}>Choose File</p>
            <div style={{marginTop: 10, color: '#953AE7'}}>Max file size {MEGABYTES} mb</div>
            <div style={{color: '#953AE7'}}>Max duration {MINUTES} minutes</div>
          </label>
          <input
            id="fileInput"
            type="file"
            accept="video/*"
            onChange={(ev) => handleFileUpload(ev.target.files)}
            className="hidden"
          />
        </div>
      )}
    </div>
  );

}

export default UploadForm;