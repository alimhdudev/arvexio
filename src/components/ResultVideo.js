import React, {useEffect, useState, useRef} from "react";
import { toBlobURL, fetchFile } from '@ffmpeg/util';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import parseSrt from 'parse-srt';
import html2canvas from "html2canvas";
import roboto from './../fonts/Roboto-Regular.ttf';
import robotoBold from './../fonts/Roboto-Bold.ttf';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { RxEnterFullScreen } from "react-icons/rx";
import { Rnd } from 'react-rnd';
import { AnimatePresence, animate, animations, color, motion, useAnimation } from "framer-motion";
import domtoimage from 'dom-to-image';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import axios from 'axios';
import subsrt from 'subsrt';
import {Slider} from "@nextui-org/react";
import { gsap } from "gsap";
import * as htmlToImage from 'html-to-image';
import {transcriptionItemsToSrt} from "../libs/awsTranscriptionHelpers.js";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { useRouter } from 'next/navigation'

export default function ResultVideo(
  {
    shadow,
    setShadow,
    textAlign,
    setTextAlign,
    animationSpeed,
    setAnimationSpeed,
    backgroundColor,
    setBackgroundColor,
    animateValue,
    setAnimateValue,
    noneAnimation,
    setNoneAnimation,
    popUpAnimation,
    setPopUpAnimation,
    shadowMode,
    setShadowMode,
    shadowNone,
    setShadowNone,
    shadowSsetShadowS,
    shadowM,
    setShadowM,
    shadowL,
    setShadowL,
    shadowS,
    setShadowS,
    caseMode,
    setCaseMode,
    myWeight,
    setMyWeight,
    fontMode,
    setFontMode,
    emojiMode,
    setEmojiMode,
    emojiBottom,
    setEmojiBottom,
    emojiTop,
    setEmojiTop,
    emojiNone,
    setEmojiNone,
    color1,
    color2,
    color3,
    displayMode,
    colorF,
    setColorF,
    setColor1,
    setColor2,
    setColor3,
    setDisplayMode,
    xPos,
    setXPos,
    yPos,
    setYPos,
    captionSize,
    setCaptionSize,
    transcriptionItems,
    setTranscriptionItems,
    isExporting,
    setIsExporting,
    offsetX,
    setOffsetX,
    offsetY,
    setOffsetY,
    blur,
    setBlur,
    shadowColor,
    setShadowColor,
    srt,
    setSrt,
    serverVideoUrl,
    setServerVideoUrl,  
    line,
    setLine,
    selectColor,
    setSelectColor,
    bgDownloading,
    setBgDownloading,
    videoProgress,
    setVideoProgress,
    isVisible,
    setIsVisible,
    isOpen,
    onOpen,
  }
  ) {
  const controls = useAnimation();
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentEmoji, setCurrentEmoji] = useState('');
  const [videoTime, setVideoTime] = useState(0);
  let isGetWordElementsRunning = false;
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState();
  const [currentLineDuration, setCurrentLineDuration] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);
  const [scaledLineProgress, setScaledLineProgress] = useState(0);
  const [lineDuration, setLineDuration ] = useState(0);
  const [lineCaptionsExternal, setLineCaptionsExternal] = useState([]);
  const [externalLineDurationPercent, setExternalLineDurationPercent] = useState(0);
  const [transContainerColor, setTransContainerColor] = useState();

  setVideoProgress(progress)

  function easeInOutQuint(x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
  }
  
  useEffect(() => {
    let intervalId;
    // Ensure lineCaptionsExternal has content before proceeding
    if (lineCaptionsExternal.length > 0) {
      // Find the start and end times of the entire line in lineCaptionsExternal
      const lineStart = Math.min(...lineCaptionsExternal.map(caption => caption.start));
      const lineEnd = Math.max(...lineCaptionsExternal.map(caption => caption.end));
  
      // Calculate lineDuration considering the entire line
      const lineDuration = lineEnd - lineStart;
  
      intervalId = setInterval(() => {
        // Get the current time of the video
        const currentTime = videoRef.current.currentTime;
  
        // Calculate elapsed duration based on the current time and the start time of the line
        const elapsedDuration = Math.max(0, currentTime - lineStart);
  
        // Calculate externalLineDurationPercent with a limit to 1.0 (0) and apply easing function
        let externalLineDurationPercent = Math.min(elapsedDuration / lineDuration, 1.0);
        externalLineDurationPercent = easeInOutQuint(externalLineDurationPercent);
  
        // Update state
        setExternalLineDurationPercent(externalLineDurationPercent);
      }, 10);
    }
  
    // Clear the interval when the component is unmounted or when necessary
    return () => clearInterval(intervalId);
  }, [currentLine, lineCaptionsExternal]);
  
  const handleProgress = (e) => {
    if (isNaN(e.target.duration))
      return;
  
    const currentTime = e.target.currentTime;
    setProgress((currentTime / e.target.duration) * 100);
  
    // Find the current line based on currentTime
    const currentLine = lineCaptionsExternal.find((caption) => caption.start <= currentTime && currentTime <= caption.end);
  
    if (currentLine) {
      // Calculate lineProgress within the current line
      const currentLineProgress = currentTime - currentLine.start;
      // setLineProgress(currentLineProgress);
  
      // Calculate and set the scaledLineProgress between 0.4 and 1
      const scaledValue = Math.max(0, (currentLineProgress - 0.4 * lineDuration) / (0.6 * lineDuration));
      // setScaledLineProgress(scaledValue);
    }
  };
  
  useEffect(() => {
    // Set up an interval to update progress 1000 times a second
    const interval = setInterval(() => {
      // Here you can put any additional logic related to progress updates
      // For example, you can update the lineProgress and scaledLineProgress values
    }, 1); // 1 millisecond interval for approximately 1000 updates per second
  
    // Clear the interval when the component is unmounted or when necessary
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures the useEffect runs once on mount
  

  const togglePlayPause = () => {
    if (isPlaying) {videoRef.current.pause();} 
    else {videoRef.current.play();}
    setIsPlaying(!isPlaying);
  };
  const toggleFullscreen = () => {
    if (isFullscreen) {document.exitFullscreen();} 
    else {videoRef.current.requestFullscreen();}
    setIsFullscreen(!isFullscreen);
  };
  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    videoRef.current.volume = volume / 100;
  };
  function easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 3;
  
    return x === 0
      ? 0
      : x === 1
      ? 1
      : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  }

  const handleProgressChange = (e) => {
    const video = videoRef.current;
    video.currentTime = (e.target.value / 100) * video.duration;
    let currentCaption = captions.find(c => video.currentTime >= c.start && video.currentTime <= c.end);
    if (currentCaption) {
      let progress = (video.currentTime - currentCaption.start) / (currentCaption.end - currentCaption.start);
      controls.set(progress);
    }
    // Create a new 'seeked' event
    const seekedEvent = new Event('seeked');
    // Dispatch the 'seeked' event
    video.dispatchEvent(seekedEvent);
  };
  const toggleVolume = () => {setShowVolume(!showVolume);};
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current) {setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);}
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    videoRef.current.src = serverVideoUrl;
    load();
  }, [serverVideoUrl]);
  const load = async () => {
    const ffmpeg = ffmpegRef.current;
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd'
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
    await ffmpeg.writeFile('/tmp/roboto.ttf', await fetchFile(roboto));
    await ffmpeg.writeFile('/tmp/roboto-bold.ttf', await fetchFile(robotoBold));
    setLoaded(true);
  };
  // Generating captions on screen
  const [colorSwitch, setColorSwitch] = useState(true);
  const captions = parseSrt(srt);
  const [lastCaptionTime, setLastCaptionTime] = useState(0);
  const calculateLineDuration = (captions) => {
    if (captions.length > 0) {
      let firstCaptionStart = captions[0].start;
      let lastCaptionEnd = captions[captions.length - 1].end;
      return lastCaptionEnd - firstCaptionStart;
    }
    return 0;
  };
  // Captions displaying modes: 2 lines, 1 line, 1 words. And coloring them
  useEffect(() => {
    if (videoRef.current) {
      // Captions display mode. 2 lines, 1 line, 1 word
      const updateCaption = () => {
        let lineIndex;
        let lineCaptions;
        switch (displayMode) {
          case '2 lines':
            lineIndex = Math.floor(captions.findIndex(c => videoRef.current.currentTime >= c.start && videoRef.current.currentTime <= c.end) / 4);
            lineCaptions = captions.slice(lineIndex * 4, lineIndex * 4 + 4);
            break;
          case '1 line':
            lineIndex = Math.floor(captions.findIndex(c => videoRef.current.currentTime >= c.start && videoRef.current.currentTime <= c.end) / 2);
            lineCaptions = captions.slice(lineIndex * 2, lineIndex * 2 + 2);
            break;
          case '1 word':
            lineIndex = captions.findIndex(c => videoRef.current.currentTime >= c.start && videoRef.current.currentTime <= c.end);
            lineCaptions = captions.slice(lineIndex, lineIndex + 1);
            break;
          default:
            break;
        }
        // Calculate line duration and set it
        // const duration = calculateLineDuration(lineCaptions);
        // setLineDuration(duration);
        // setLineDuration(lineDuration);

        // If lineCaptions is not empty, update currentLine and lastCaptionTime
        if (lineCaptions.length > 0) {
          // Calculate the duration of the line based on the start and end times of the captions
          const lineDuration = lineCaptions[lineCaptions.length - 1].end - lineCaptions[0].start;
          setLineDuration(lineDuration);
    
          const words = lineCaptions.flatMap(caption => caption.text.split(' '));
          setCurrentLine(words.join(' '));
          setLastCaptionTime(videoRef.current.currentTime);
        }  else if (videoRef.current.currentTime - lastCaptionTime > 3) {
          // If more than 3 seconds have passed since the last caption, clear currentLine
          setCurrentLine('');
        }
        setLineCaptionsExternal(lineCaptions);
      };
      videoRef.current.ontimeupdate = updateCaption;
    }
    // const no = null;
    // return () => {
    //   if (videoRef.current) {
    //     videoRef.current.ontimeupdate = no;
    //   }
    // };
  }, [videoRef, lineCaptionsExternal, captions, displayMode, lastCaptionTime]); // Empty dependency array
  const router = useRouter()
  // Export video
  const exportVideo = async () => {
    // make the background video black
    setBgDownloading(true)
    setIsVisible(false)
    const video = videoRef.current; // Define the video element
    const fps = 30; // frames per second
    const interval = 1 / fps; // interval of capturing in seconds
    const frames = []; // array to store the frames (captured screenshots)
    const captureFrame = async () => {
      // If the video has reached the end, remove the event listener and send the frames to the server to convert them to a video
      if (video.currentTime >= video.duration) {
        video.removeEventListener('seeked', captureFrame);
        // Send the frames and video URL to the server
        const response = await fetch('/api/convert', {
          timeout: 1000 * 1000 * 1000,
          signal: AbortSignal.timeout(1000 * 1000 * 1000),
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ frames, width: video.videoWidth, height: video.videoHeight }),
        }, 1000 * 1000 * 1000);
        // If the server returns an error, throw an error
        if (!response) {
          throw new Error(`Server error: ${response.statusText}`);
        }
        // console.log('response', response);
        const contentType = response.headers.get('Content-Type');
        if (response && contentType && contentType.startsWith('video/')) {
          // If the server returns a success response and it's a video, download the video
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'video.mp4';
          document.body.appendChild(link);
          link.click(); // Click the link to download the end video
          document.body.removeChild(link); // Clean up and remove the link
      
          // Execute the next steps only if the file is a video
          // router.push('/');
          onOpen()
          setTransContainerColor('block');
          setBgDownloading(false)
          setIsVisible(true)
        } else {console.error('The response is not a video file.')}
      }        
      // Capture the captions using html2canvas with increased scale and transparent background
      // turn off the video
      setTransContainerColor('none')
      const canvas = document.querySelector('#captionsContainer')
      const render = await html2canvas(canvas, { backgroundColor: null});
      // console.log('captured');
      video.currentTime += interval;
      // Convert the canvas to a data URL
      const dataUrl = render.toDataURL();
      // Push the data URL to the frames array
      frames.push(dataUrl);
      // Move the video's current time forward by the interval
    }
    // Add the event listener to the video
    video.addEventListener('seeked', captureFrame);
    // Start at the beginning of the video
    video.currentTime = 0;
  };
  
  // Caption size control
  useEffect(() => {
    const controlBar = document.querySelector('#caption-size-control');
    const handleControlBarChange = (event) => {document.documentElement.style.setProperty('--caption-size', `${event.target.value}px`);};
    if (controlBar) {controlBar.addEventListener('input', handleControlBarChange);}
    return () => {if (controlBar) {controlBar.removeEventListener('input', handleControlBarChange);}};
  }, []);
  // Caption position control
  const frameRate = 60; // Replace this with your video's frame rate
  let totalFrames = 0;
  if (videoRef.current) {totalFrames = Math.floor(videoRef.current.duration * frameRate);}
  const [maxValue, setMaxValue] = useState(0);
  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    const video = videoRef.current;
  
    const handleMetadataLoad = () => {
      setMaxValue(video.duration);
    };
  
    video.addEventListener('loadedmetadata', handleMetadataLoad);
  
    return () => {
      video.removeEventListener('loadedmetadata', handleMetadataLoad);
    };
  }, []);
  // Get the every 1st word appearing on screen at the current moment
  const [currentWord, setCurrentWord] = useState([]);
  useEffect(() => {
    let animationFrameId;

    const handleTimeUpdate = () => {
      if (Array.isArray(captions)) {
        let lineIndexx = captions.findIndex(c => videoRef.current.currentTime >= c.start && videoRef.current.currentTime <= c.end);
        let lineCaptionss = captions.slice(lineIndexx, lineIndexx + 1);
        const words = lineCaptionss.flatMap(caption => caption.text.split(' '));
        setCurrentWord(words.join(' '));
      }

      // Request the next frame
      animationFrameId = requestAnimationFrame(handleTimeUpdate);
    };

    // Start the loop
    animationFrameId = requestAnimationFrame(handleTimeUpdate);

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [captions]);


  // Border-color every current word
  function getWordElements(currentLine, currentWord, backgroundColor) {
    isGetWordElementsRunning = true;
    let wordElements = [];

    if (typeof currentLine === 'string') {
      let wordsWord = currentLine.split(' ');

      for (let index = 0; index < wordsWord.length; index++) {
        let wordBorder = wordsWord[index];
        // Append a space to each word except the last one
        if (index < wordsWord.length - 1) {
          wordBorder += ' ';
        }
        if (wordBorder.trim() === currentWord) {
          wordElements.push(
            <motion.span 
              key={wordBorder + index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ ease: "easeOut", duration: 0.2 }}
              style={{ borderRadius: '10px', backgroundColor: currentLine ? backgroundColor : null, display: 'inline-block', padding: '2px' }}
            >
              {wordBorder}
            </motion.span>
          );
        } else {
          wordElements.push(<span key={wordBorder + index} style={{ color: '#ffffff' }}>{wordBorder}</span>);
        }
      }
    }
    isGetWordElementsRunning = false;
    return wordElements;
  }

  const generateColoredSequenceWords = (currentLine, currentWord, color1, color2, color3) => {
    let wordElements = [];
  
    if (typeof currentLine === 'string') {
      let words = currentLine.split(' ');
  
      for (let index = 0; index < words.length; index++) {
        let word = words[index];
        
        // Append a space to each word except the last one
        if (index < words.length - 1) {
          word += ' ';
        }
  
        let color;
        if ((index + 1) % 5 === 0) {
          color = color3; // Color every 5th word in color3
        } else if ((index + 1) % 3 === 0) {
          color = color2; // Color every 3rd word in color2
        } else if ((index + 1) % 2 === 0) {
          color = color1; // Color every 2nd word in color1
        } else {
          color = 'white'; // Default color for other words
        }
  
        wordElements.push(
          <span key={word + index} style={{ color: color }}>
            {word}
          </span>
        );
      }
    }
    return wordElements;
  };
  
  
    
  // TextColor every current word in range of currentLine
  const generateColoredWords = () => {
    let foundCurrentWord = false;
    const words = currentLine.split(' ');

    if (words.length === 0) {
      return '\u00A0'; // Return a non-breaking space when there are no words
    }

    return words.map((word, index) => {
      if (word === currentWord) {
        foundCurrentWord = true;
      }

      return (
        <span 
          key={index}
          style={{
            fontFamily: fontMode, 
            fontWeight: myWeight, 
            textTransform: caseMode,
            textShadow: foundCurrentWord ? shadowMode : 'none', // Conditionally apply textShadow
            color: foundCurrentWord ? '#888' : 'black', // color words before currentWord
            display: 'inline', // display words in a line
            animation: foundCurrentWord ? `colorChange 1s ${index * 0.05}s forwards` : 'none', // Add staggered animation
          }} 
          className='captions-words' 
        >
          {word + ' '}
        </span>
      );
    });
  };
  // Function to generate stacked words
  const generateStackWords = () => {
    let foundCurrentWord = false;

    return currentLine.split(' ').map((word, index) => {
      if (word === currentWord) {
        foundCurrentWord = true;
      }

      return (
        <span 
          key={index}
          style={{
            fontFamily: fontMode, 
            fontWeight: myWeight, 
            textTransform: caseMode,
            textShadow: foundCurrentWord ? 'none' : shadowMode,
            textAlign: textAlign,
            color: foundCurrentWord ? 'transparent' : 'white', // color words before currentWord
            whiteSpace: 'nowrap', // prevent words from breaking into new lines
          }} 
          className='captions-words' 
        >
          {word + ' '}
        </span>
      );
    });
  };
  const [lineDurationScale, setLineDurationScale] = useState(0);

  return (
    <div className="Body-area items-center justify-center ">
      <div className="rounded-xl overflow-hidden relative ">
        {/* General video container */}
        <div id="general-video" className="general-video-container text-center">
          <style>
            @import url(&apos;https://fonts.googleapis.com/css2?family=Bangers&family=Montserrat:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300&family=Noto+Sans:wght@100;200;300;400;500;600;700;800;900&family=Nunito:wght@200;300;400;500;600;700;800&family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Raleway:wght@100;200;300;400;500;600;700;800;900&family=Roboto:wght@100;300;400;500;700;900&family=Rubik:wght@300;400;500;600;700;800;900&display=swap&apos;);
            @import url(&apos;https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap&apos;);
            @import url(&apos;https://fonts.cdnfonts.com/css/tt-fors-trial&apos;);
            @import url(&apos;https://fonts.cdnfonts.com/css/komika&apos;);
            @import url(&apos;https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&family=Oswald:wght@200;300;400;500;600;700&display=swap&apos;);
            @import url(&apos;https://fonts.cdnfonts.com/css/eurostile-2&apos;);
            @import url(&apos;https://fonts.cdnfonts.com/css/the-bold-font&apos;);
            @import url(&apos;https://fonts.cdnfonts.com/css/futura-std-4&apos;);
            @import url(&apos;https://fonts.cdnfonts.com/css/helvetica-255&apos;);

            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            {/* <link href="" rel="stylesheet"/> */}
          </style>
          {/* Video controls custom-made */}
          <div id='videoLayer' className='videoLayer top-0' style={{width: '500px', height: '528px', textAlign: 'center'}}>
            {/* Captions display (on top of the video) */}
              <div 
                id="captionsContainer"
                style={{
                  position: 'absolute',
                  zIndex: 40,
                  width: '100%',
                  height: '100%',
                }}
              >
                <Rnd 
                id="captions" 
                className="captions handle text-center" 
                style={{ 
                  color:colorF,
                  border: 0, 
                  zIndex: 20, 
                  fontSize: `${captionSize}px`, 
                  top:`${yPos-15}px`, 
                  textAlign: 'center',
                }}
                default={{
                  x: 0,
                  y: 350,
                  width: '100%',
                  height: '100%',
                }}
                >   
                  {
                    emojiMode === 'none' && (
                      <div>
                        {
                          <div>
                            {
                              animateValue === 'none' && (
                                <div>
                                    <p style={{fontFamily: fontMode, fontWeight: myWeight, textTransform: caseMode,textShadow: shadowMode,textAlign: 'center'}} className='captions-words' dangerouslySetInnerHTML={{ __html: currentLine }} />
                                </div>
                              )
                            }
                            {
                              animateValue === 'borderfull' && 
                              (
                                <div style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
                                    <motion.div 
                                        key={currentLine}
                                        style={{ scale: externalLineDurationPercent,borderRadius: '10px', backgroundColor: currentLine ? backgroundColor : null, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, marginLeft: -5, marginRight: -5 }}
                                    />
                                    <p 
                                        style={{ fontFamily: fontMode, fontWeight: myWeight, textTransform: caseMode, textShadow: shadowMode, color: 'white', position: 'relative',textAlign: 'center' }} 
                                        dangerouslySetInnerHTML={{ __html: currentLine }} 
                                    />
                                </div>
                              )
                            }
                            {
                              animateValue === 'borderword' && 
                              (
                                <div style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
                                  <p 
                                    style={{ fontFamily: fontMode, fontWeight: myWeight, textTransform: caseMode, textShadow: shadowMode, color: colorF, position: 'relative', padding: '10px', textAlign: 'center' }} 
                                    className='captions-words'
                                  >
                                    {getWordElements(currentLine, currentWord, backgroundColor, 50)} {/* Example: 50% duration */}
                                  </p>
                                </div>

                              )
                            }
                            {
                              animateValue === 'popup' && 
                              ( 
                                <motion.div
                                  style={{
                                    scale: externalLineDurationPercent,
                                    opacity: externalLineDurationPercent,
                                  }}
                                >
                                  <p style={{textAlign: "center", display: 'flex', flexDirection: 'column', fontFamily: fontMode, fontWeight: myWeight, textTransform: caseMode,textShadow: `${offsetX}px ${offsetY}px ${blur}px ${shadowColor}`}} className='captions-words' id="captions-words" dangerouslySetInnerHTML={{ __html: currentLine }} />
                                </motion.div>
                              )
                            }
                            
                            {
                              animateValue === 'colored' && (
                                <div>
                                  <p 
                                    style={{
                                      fontFamily: fontMode, 
                                      fontWeight: myWeight, 
                                      textTransform: caseMode,
                                      textShadow: shadowMode,
                                      textAlign: 'center',
                                    }} 
                                  >
                                    {generateColoredSequenceWords(currentLine, currentWord, color1, color2, color3)}
                                  </p> 
                                </div>
                              )
                            }
                            {
                              animateValue === 'appear' &&
                              (
                                <div style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
                                  <p 
                                    style={{
                                      fontFamily: fontMode, 
                                      fontWeight: myWeight, 
                                      textTransform: caseMode,
                                      textShadow: shadowMode,
                                      backgroundColor: currentLine ? selectColor : null, // greyish background
                                      color: '#222222', // light black text
                                      borderRadius: '15px', // rounded corners
                                      padding: '7px', // padding
                                      textAlign: 'center'
                                    }} 
                                  >
                                    {generateColoredWords()}
                                  </p>
                                </div>                        
                              )
                            }
                            {
                              animateValue === 'stack' &&
                              (
                                <div style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
                                  <p 
                                    style={{
                                      fontFamily: fontMode, 
                                      fontWeight: myWeight, 
                                      textTransform: caseMode,
                                      textAlign: 'left'
                                    }} 
                                  >
                                    {generateStackWords()}
                                  </p>
                                </div>
                              )
                            }
                            {
                              animateValue === 'fadein' &&
                              (
                                <motion.div 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.2 }}
                                  key={currentLine}
                                >
                                  <p style={{fontFamily: fontMode, fontWeight: myWeight, textTransform: caseMode,textShadow: shadowMode,textAlign: 'center'}} className='captions-words' dangerouslySetInnerHTML={{ __html: currentLine }} />
                                </motion.div>
                                // <p style={{fontFamily: fontMode, fontWeight: myWeight, textTransform: caseMode,textShadow: shadowMode,}} className='captions-words' dangerouslySetInnerHTML={{ __html: currentLine }} />
                              )
                            }
                          </div>
                        }
                      </div>
                    )
                  }

                </Rnd>
              </div>

              {/* <div 
                className="transparent-container"
                style={{
                  position: 'absolute',
                  zIndex: 30,
                  width: '100%',
                  height: '100%',
                  backgroundColor: transContainerColor,
                }}
              /> */}

              {/* Initial Video */}
              <video
                id="input-video"
                data-video={0}
                ref={videoRef}
                src={serverVideoUrl}
                onTimeUpdate={handleProgress} 
                style={{width: '100%', height: '100%', userSelect: 'none', pointerEvents: 'none', position: 'absolute', zIndex: 10, display: transContainerColor}}
              >
              </video>
          </div>

      </div>
      {/* End of General video container */}
      </div>

      {/* Video controls custom-made */}
      <div 
      className="custom-controls" 
      style={{
        position: 'relative',
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button id="play-button" onClick={togglePlayPause}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={toggleVolume}>
              {volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}
            </button>
            {showVolume && (
              <input 
                  type="range" 
                  className="input-range"
                  min="0" 
                  max="100" 
                  value={volume} 
                  onChange={handleVolumeChange} 
                  style={{
                    width: '100px', // Adjust as needed
                    display: 'inline-block',
                    background: `linear-gradient(to right, #ffffff 100%, #ffffff ${progress}%, #ffffff ${progress}%, #d3d3d3 100%)`,
                    outline: 'none',
                    opacity: '0.5',
                    borderRadius: '10px',
                    height: '5px',
                  }} 
              />
            )}
            <div className="text-sm">
              {videoRef.current && `${Math.floor(videoRef.current.currentTime / 60)}:${String(Math.floor(videoRef.current.currentTime % 60)).padStart(2, '0')} / ${Math.floor(videoRef.current.duration / 60)}:${String(Math.floor(videoRef.current.duration % 60)).padStart(2, '0')}`}
            </div>
          </div>
          <button onClick={toggleFullscreen}>
            {isFullscreen ? <RxEnterFullScreen /> : <RxEnterFullScreen />}
          </button>
        </div>
        {/*  */}
        <div style={{ width: '90%', backgroundColor: 'white' ,borderRadius: 10, }}>

          <input 
          id="progress-bar"
          type="range" 
          min="0" 
          max="100" 
          value={progress} 
          onChange={handleProgressChange} 
          style={{width: '100%'}}
        />

        </div>
      </div>
      {/* Export button */}
      <div>
        <button onClick={exportVideo} className="bg-[#7F00FF] text-white font-bold w-full flex items-center py-2 px-6 rounded-xl gap-2 border-2 border-purple-700/50 cursor-pointer mx-auto">
          <span className="mx-auto">Export</span>
        </button>
      </div>
    {/* End of body area */}
    </div>
  );
}