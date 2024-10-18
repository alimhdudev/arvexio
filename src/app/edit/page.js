"use client";
import ResultVideo from "../../components/ResultVideo.js";
import TranscriptionEditor from "../../components/TranscriptionEditor.js";
import {clearTranscriptionItems} from "../../libs/awsTranscriptionHelpers.js";
import axios from "axios";
import {useState, useEffect} from 'react';
import { Inter, Plus_Jakarta_Sans, Montserrat } from 'next/font/google'
import Style from "../../components/Style.js";
import React, { useRef } from 'react';
import {Tabs, Tab, Card, CardBody} from "./lib/nextui.js";
import Templates from "../../components/Templates.js";
import {CircularProgress} from "@nextui-org/react";
import { Auth } from '@supabase/auth-ui-react'
import { createClient } from '@supabase/supabase-js'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession } from "@supabase/auth-helpers-react";
import Subscribe from "../../components/Subscribe.jsx";
import { motion } from "framer-motion"
import {Progress} from "@nextui-org/react";
import useWindowSize from 'react-use/lib/useWindowSize'
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useRouter } from 'next/navigation'

const font = Plus_Jakarta_Sans({ subsets: ['latin'] })
const font2 = Montserrat({ subsets: ['latin'] })
const font3 = Inter({ subsets: ['latin'] })

export default function FilePage() {
  const tips = [
    "Do your best to get your footage in the morning or evening, when the light is softer.",
    "Plan your video first.",
    "The location of your video matters. Consider what the location tells your audience.",
    "As a general rule, you should shoot your video using soft lighting, rather than hard lighting.",
    "Audiences are easily distracted by objects in the background, keep the backdrop super simple.",
    "Steer clear of shaky footage.",
    "Use the rule of thirds.",
    "Stick to a time limit, the average attention span is 8.52 seconds.",
    "Focus on the audio quality, eliminate any background noise.",
    "Capture several angles, shoot your subject from a variety of different angles.",
    "Keep your editing simple, the best course of action is to keep your editing style slick, smooth, and simple.",
    "Don’t rely on the equipment — you need technique too.",
    "Don’t forget to check the sound quality.",
    "Don’t make your professional videos too long.",
    "Don’t rush into making your video without a plan.",
    "Avoid flashy effects and garish transitions, this can detract from the content of the video.",
    "Make sure that you plan ahead, get the right equipment, and take things slowly.",
    "To ensure that your professional video is interesting, pick out two or three central points.",
    "Use plenty of light, it makes a huge difference in the quality of a finished professional video.",
    "Use a clean background, nothing looks less professional than a messy or distracting background.",
    "Keep your editing simple.",
    "Prioritize crisp, clear audio.",
    "Avoid shaky footage.",
    "Understand the rule of thirds.",
    "Plan your videos in advance.",
    "Promote your videos.",
    "Invest time in writing a winning script.",
    "Deliver confident narration in front of the camera.",
    "Pay attention to pacing when editing.",
    "Review your video for clarity and brevity.",
    "Research your topic, the easiest ways to decide your video topic is to conduct keyword research inside YouTube.",
    "Pick the right location, you can shoot the video in-house or head outdoors.",
    "For beginners, natural light is an excellent option. It doesn’t cost anything and is fully capable of making the subject of your video look good.",
    "As you scale your production capacity, you’ll probably want to invest in lighting equipment to boost the quality of your videos.",
    "Stabilized footage is essential for the success, shaky footage looks unprofessional and strains the eyes of your audience.",
    "Composition is how you choose to frame your subject in the video you’re about to capture.",
    "Be comfortable on camera, we suggest you sit/stand up straight with your shoulders back so you look professional, focused and relaxed.",
    "Try to speak slowly and enunciate each word clearly so your message is easy to understand.",
    "Filming videos in small segments is a great way to keep yourself focused on the topic you’re discussing. And it also becomes easier to edit the footage in post-production.",
    "Regardless of the type of video you create, whether educational, business-related or simply an artistic video, make sure you properly share it with your audience to maximize its impact.",
    "You can also share your videos on different groups and forums, such as Reddit, Quora and Facebook groups.",
    "Creating professional videos sounds intimidating, but it doesn’t really have to be.",
    "Video production is the process used to produce video content. Typically, it consists of three phases: pre-production, production, and post-production.",
    "Professional-quality video production requires a lot of specialized cameras, lighting, audio.",
    "Writing a script is always necessary if your video includes a professional voice-over or people talking to the camera.",
    "Narrow down the focus of your marketing videos to just one topic, message, or idea.",
    "If you’re going for a live-action piece, scout and secure the locations you have in mind for the video shoot ahead of time.",
    "Make a checklist of the gear you’re going to need before you go to the video shoot location: tripods, cords, spare batteries.",
    "Whether you’re going for live-action or animated marketing videos, you can incorporate your brand’s characteristic colors to increase brand awareness and recognition.",
    "Once you’re done filming the raw, unedited footage, immediately upload it to a hard drive or cloud storage service to prevent losing it or deleting it on accident.",
    "Most video editing software allows you to clip the beginnings and ends of footage as you import it, so try to delete any false starts or pauses to save time.",
    "If you’re adding an intro and outro, now it’s the time to do so.",
    "Background music and sound effects are a must in marketing video production.",
    "Keep your camera steady to avoid shaky footage.",
    "Use a tripod or stabilizer to achieve smooth camera movements.",
    "Experiment with different camera angles and perspectives to add visual interest to your videos.",
    "Consider the background of your shots and ensure it complements your subject.",
    "Use natural light whenever possible, but be mindful of harsh shadows.",
    "Invest in a good microphone for clear audio.",
    "Use a windscreen or dead cat to reduce wind noise when filming outdoors.",
    "Create a shot list or storyboard to plan your shots in advance.",
    "Shoot in high resolution to maintain quality when editing and exporting.",
    "Experiment with different frame rates to achieve different visual effects.",
    "Consider the pacing of your edits to keep your audience engaged.",
    "Use transitions sparingly and purposefully.",
    "Add captions or subtitles to make your videos accessible to a wider audience.",
    "Use B-roll footage to add context or illustrate key points.",
    "Experiment with different video formats, such as tutorials, vlogs, or interviews.",
    "Collaborate with other creators to reach new audiences and share expertise.",
    "Engage with your audience by responding to comments and messages.",
    "Use analytics to track the performance of your videos and identify areas for improvement.",
    "Stay up to date with trends and changes in the video industry.",
    "Experiment with different editing styles and techniques to develop your own unique style.",
    "Consider the emotional impact of your videos and how you want your audience to feel.",
    "Use storytelling techniques to create a narrative arc and keep viewers hooked.",
    "Consider the length of your videos and tailor them to the platform and audience.",
    "Use music to enhance the mood and tone of your videos.",
    "Experiment with different video effects and filters to add visual interest.",
    "Use color grading to create a consistent look and feel across your videos.",
    "Consider the composition of your shots and how elements are arranged within the frame.",
    "Use foreground elements to add depth and dimension to your shots.",
    "Experiment with different camera movements, such as pans, tilts, and zooms.",
    "Use the 'rule of thirds' to compose visually pleasing shots.",
    "Experiment with different focal lengths to achieve different perspectives.",
    "Use depth of field to draw attention to your subject and create a sense of depth.",
    "Experiment with different aspect ratios to achieve different visual effects.",
    "Use framing to highlight important elements within your shots.",
    "Use leading lines to draw the viewer's eye towards your subject.",
    "Experiment with different lighting setups to achieve different moods and effects.",
    "Use soft lighting to create flattering portraits and reduce harsh shadows.",
    "Experiment with different color temperatures to achieve different effects.",
    "Use natural light to create soft, diffused lighting.",
    "Experiment with different light modifiers, such as reflectors and diffusers, to control the quality and direction of light.",
    "Use backlighting to create depth and separation between your subject and the background.",
    "Use sidelighting to create texture and dimension in your shots.",
    "Use key, fill, and rim lighting to create a balanced and visually appealing lighting setup.",
    "Use practical lights, such as lamps and candles, to add warmth and atmosphere to your shots.",
    "Use artificial lights, such as LED panels and strobes, to create controlled and consistent lighting setups.",
    "Experiment with different lighting ratios to achieve different effects.",
    "Use hard lighting to create dramatic shadows and highlights.",
    "Experiment with different light sources, such as tungsten, fluorescent, and LED lights, to achieve different color temperatures and effects.",
    "Use gels and filters to add color and mood to your lighting setups.",
    "Experiment with different lighting angles and positions to achieve different effects.",
    "Use natural light to create soft, flattering portraits.",
    "Use artificial lights to create controlled and consistent lighting setups.",
    "Use diffusers and reflectors to modify the quality and direction of light.",
    "Use backlighting to create separation between your subject and the background.",
    "Experiment with different light modifiers, such as softboxes and umbrellas, to achieve different lighting effects.",
    "Use practical lights, such as lamps and candles, to add warmth and atmosphere to your shots.",
    "Use artificial lights, such as LED panels and strobes, to create controlled and consistent lighting setups.",
    "Experiment with different lighting ratios to achieve different effects.",
    "Use hard lighting to create dramatic shadows and highlights.",
    "Experiment with different light sources, such as tungsten, fluorescent, and LED lights, to achieve different color temperatures and effects.",
    "Use gels and filters to add color and mood to your lighting setups.",
    "Experiment with different lighting angles and positions to achieve different effects.",
    "Use natural light to create soft, flattering portraits.",
    "Use artificial lights to create controlled and consistent lighting setups.",
    "Use diffusers and reflectors to modify the quality and direction of light.",
    "Use backlighting to create separation between your subject and the background.",
    "Experiment with different light modifiers, such as softboxes and umbrellas, to achieve different lighting effects.",
    "Use practical lights, such as lamps and candles, to add warmth and atmosphere to your shots.",
    "Use artificial lights, such as LED panels and strobes, to create controlled and consistent lighting setups.",
    "Experiment with different lighting ratios to achieve different effects.",
    "Use hard lighting to create dramatic shadows and highlights.",
    "Experiment with different light sources, such as tungsten, fluorescent, and LED lights, to achieve different color temperatures and effects.",
    "Use gels and filters to add color and mood to your lighting setups.",
    "Experiment with different lighting angles and positions to achieve different effects.",
    "Use natural light to create soft, flattering portraits.",
    "Use artificial lights to create controlled and consistent lighting setups.",
    "Use diffusers and reflectors to modify the quality and direction of light.",
    "Use backlighting to create separation between your subject and the background.",
    "Experiment with different light modifiers, such as softboxes and umbrellas, to achieve different lighting effects.",
    "Use practical lights, such as lamps and candles, to add warmth and atmosphere to your shots.",
    "Use artificial lights, such as LED panels and strobes, to create controlled and consistent lighting setups.",
    "Experiment with different lighting ratios to achieve different effects.",
    "Use hard lighting to create dramatic shadows and highlights.",
    "Experiment with different light sources, such as tungsten, fluorescent, and LED lights, to achieve different color temperatures and effects.",
    "Use gels and filters to add color and mood to your lighting setups.",
    "Experiment with different lighting angles and positions to achieve different effects.",
    "Do your best to get your footage in the morning or evening, when the light is softer.",
    "Plan your video first.",
    "The location of your video matters. Consider what the location tells your audience.",
    "As a general rule, you should shoot your video using soft lighting, rather than hard lighting.",
    "Audiences are easily distracted by objects in the background, keep the backdrop super simple.",
    "Steer clear of shaky footage.",
    "Use the rule of thirds.",
    "Stick to a time limit, the average attention span is 8.52 seconds",
  ];
  let [isLimited, setIsLimited ] = useState('5');
  const { width, height } = useWindowSize()

  const checkLimit = async () => {
    const response = await fetch('/api/checklimit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    });
    if (response.status === 403) {
      setIsLimited('limited')
    }
  }
  useEffect(()=>{
    checkLimit();
  },[])

  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isFetchingInfo, setIsFetchingInfo] = useState(false);

  const [serverVideoUrl, setServerVideoUrl] = useState('');
  const [srt, setSrt] = useState('');
  useEffect(() => {
    const getFiles = async () => {
      try {
        // Get the video file
        const videoRes = await axios.get('http://127.0.0.1:8000/api/download/video', { 
          responseType: 'blob',
          headers: {
            'Accept': 'video/mp4',
          },
        });
        const videoUrl = URL.createObjectURL(new Blob([videoRes.data]));
        console.log(videoUrl, 'videoUrl');
        
        setServerVideoUrl(videoUrl); // Set the state variable
      } catch (error) {
        console.error('Error getting video file:', error.response);
      }
      try {
        // Get the SRT file
        const srtRes = await axios.get('http://127.0.0.1:8000/api/download/srt', { 
          responseType: 'text',
          headers: {
            'Accept': 'application/x-subrip',
          },
        });
        console.log(srtRes.data, 'srtRes');
        
        setSrt(srtRes.data); // Set the state variable
      } catch (error) {
        console.error('Error getting SRT file:', error.response);
      }
    };
    getFiles();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex(Math.floor(Math.random() * tips.length));
    }, 30000); // Change tip every 5 seconds (for testing purposes)
  
    return () => clearInterval(interval);
  }, []);

  const router = useRouter()
  const Push = () => {
    router.push('/')
  }

  const [primaryColor, setPrimaryColor] = useState('#FFFFFF');
  const [outlineColor, setOutlineColor] = useState('#000000');
  const [value, setValue] = React.useState('1');
  const [captionSize, setCaptionSize] = useState(30);
  const [yPos, setYPos] = useState(150);
  const [xPos, setXPos] = useState(0);
  const [colorF, setColorF] = useState('#ffffff'); // Initial color
  const [displayMode, setDisplayMode] = useState('1 word');
  const [color1, setColor1] = useState('#75FB4C');
  const [color2, setColor2] = useState('#F3FF53');
  const [color3, setColor3] = useState('#D73E2C');
  const [emojiMode, setEmojiMode] = useState('none'); // ['top', 'bottom', 'none']
  const [emojiBottom, setEmojiBottom] = useState('bottom');
  const [emojiTop, setEmojiTop] = useState('top');
  const [emojiNone, setEmojiNone] = useState('none');
  const [fontMode, setFontMode] = useState('The Bold Font'); // ['Montserrat', 'Inter']
  const [myWeight, setMyWeight] = useState('700'); // ['400', '500', '600'
  const [caseMode, setCaseMode] = useState('uppercase'); // ['uppercase', 'lowercase', 'none']
  const [shadowS, setShadowS] = useState('1px 1px 2px #000');
  const [shadowM, setShadowM] = useState('2px 2px 5px #000');
  const [shadowL, setShadowL] = useState('-2px -2px 3px #000, 2px -2px 3px #000, -2px 2px 3px #000, 2px 2px 3px #000');
  const [shadowNone, setShadowNone] = useState('');
  const [shadowMode, setShadowMode] = useState(shadowL); // Default shadow mode
  const [noneAnimation, setNoneAnimation] = useState(true);
  const [popUpAnimation, setPopUpAnimation] = useState('y:10');
  const [animateValue, setAnimateValue] = useState('borderfull');
  const [backgroundColor, setBackgroundColor] = useState('#953AE7');
  const [selectColor, setSelectColor] = useState('#D3D3D3');
  const [animationSpeed, setAnimationSpeed] = useState(0.2);
  const [textAlign, setTextAlign] = useState('center');
  const [isExporting, setIsExporting] = useState(false);
  const [shadow, setShadow] = useState("5px 5px 5px #ff0000");
  const [offsetX, setOffsetX] = useState(5);
  const [offsetY, setOffsetY] = useState(5);
  const [blur, setBlur] = useState(5);
  const [shadowColor, setShadowColor] = useState("#333333");
  const [line, setLine] = ('');
  const [bgDownloading, setBgDownloading] = useState(false);
  const [videoProgress, setVideoProgress] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [currentTipIndex, setCurrentTipIndex] = useState(Math.floor(Math.random() * tips.length));

  const shadowStyles = {
    none: shadowNone,
    s: shadowS,
    m: shadowM,
    l: shadowL,
  };
  // Use the shadow style based on the current mode
  const currentShadowStyle = shadowStyles[shadowMode];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isTranscribing) {
    return (
      <div>Transcribing your video...</div>
    );
  }

  if (isFetchingInfo) {
    return (
      <div className="text-[#0A0015]">Fetching information...</div>
    );
  }

  const colors = [
    "secondary",
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
        <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange} 
          isDismissable={false} 
          isKeyboardDismissDisabled={true} 
          hideCloseButton={true} 
          backdrop={'blur'}
          shadow={'lg'}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 mx-auto">Congratulations!</ModalHeader>
                {isVisible ? (<Fireworks autorun={{ speed: 2, duration: 3000}}/>) : null}
                <ModalBody className="mx-auto">
                  <p> 
                    You have exported your video
                  </p>
                </ModalBody>
                <ModalFooter className="mx-auto">
                  <Button color="secondary" onPress={Push}>
                    Continue
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {bgDownloading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute z-50 w-screen h-screen top-0"
            >
              <div className="bg-black/90 w-full h-full backdrop-blur-md text-white inset-0 flex items-center">
                <div className="w-full text-center flex flex-col items-center">
                  <Progress
                    aria-label="Downloading..."
                    size="md"
                    value={videoProgress}
                    color="success"
                    className="max-w-sm"
                  />
                  <p className="mt-5">Rendering {Math.floor(videoProgress)}%</p>
                  <motion.div 
                    key={currentTipIndex} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="absolute mx-auto mt-[100px] w-[500px] h-[100px]"
                  >
                    <p>{tips[currentTipIndex]}</p>
                  </motion.div>

                </div>
              </div>
            </motion.div>
        ) : null
        }

        <div 
        // className="video-editor-container"
        className="
          video-editor-container
          justify-between
          items-top
          mx-auto
          bg-none
          md:flex
          md:flex-row
          md:mt-10
          md:max-w-[740px]
          md:h-[650px]

          sm:flex
          sm:flex-col-reverse
          sm:items-top
          sm:mt-0
          sm:w-[90%]

          xs:flex
          xs:flex-col-reverse
          xs:items-top
          xs:mt-0
          xs:w-[90%]
        "
      >

        {/* Left Side Video */}
        <div
          className="
            right-side-video
            items-top
            rounded-xl
            bg-white
            shadow-xl
            mx-auto
            w-[297px]
            h-fit
            bg-[100%]
          "
        >
          <ResultVideo
            line={line} 
            setLine={setLine}
            srt={srt}
            setSrt={setSrt}
            serverVideoUrl={serverVideoUrl}
            setServerVideoUrl={setServerVideoUrl}
            xPos={xPos}
            setXPos={setXPos}
            textAlign={textAlign}
            setTextAlign={setTextAlign}
            animationSpeed={animationSpeed}
            setAnimationSpeed={setAnimationSpeed}
            noneAnimation={noneAnimation}
            setNoneAnimation={setNoneAnimation}
            popUpAnimation={popUpAnimation}
            setPopUpAnimation={setPopUpAnimation}
            animateValue={animateValue}
            setAnimateValue={setAnimateValue}
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
            shadowMode={shadowMode}
            setShadowMode={setShadowMode}
            shadowNone={shadowNone}
            setShadowNone={setShadowNone}
            shadowS={shadowS}
            setShadowS={setShadowS}
            shadowM={shadowM}
            setShadowM={setShadowM}
            shadowL={shadowL}
            setShadowL={setShadowL}
            caseMode={caseMode}
            setCaseMode={setCaseMode}
            myWeight={myWeight}
            setMyWeight={setMyWeight}
            fontMode={fontMode}
            setFontMode={setFontMode}
            emojiMode={emojiMode}
            setEmojiMode={setEmojiMode}
            emojiBottom={emojiBottom}
            setEmojiBottom={setEmojiBottom}
            emojiTop={emojiTop}
            setEmojiTop={setEmojiTop}
            emojiNone={emojiNone}
            setEmojiNone={setEmojiNone}
            color1={color1}
            setColor1={setColor1}
            color2={color2} 
            setColor2={setColor2}
            color3={color3}
            setColor3={setColor3}
            displayMode={displayMode} 
            colorF={colorF} 
            setColorF={setColorF}
            yPos={yPos} 
            setYPos={setYPos}
            captionSize={captionSize} 
            transcriptionItems={srt} 
            isExporting={isExporting}
            setIsExporting={setIsExporting}
            shadow={shadow}
            setShadow={setShadow}
            offsetX={offsetX}
            setOffsetX={setOffsetX}
            offsetY={offsetY}
            setOffsetY={setOffsetY}
            blur={blur}
            setBlur={setBlur}
            shadowColor={shadowColor}
            setShadowColor={setShadowColor}
            selectColor={selectColor}
            setSelectColor={setSelectColor}
            bgDownloading={bgDownloading}
            setBgDownloading={setBgDownloading}
            videoProgress={videoProgress}
            setVideoProgress={setVideoProgress}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            isOpen={isOpen}
            onOpen={onOpen}
          />
        </div>


        {/* Right Side Editor */}
        <div 
          className="
            left-side-editor
            bg-white
            md:w-[388px]
            sm:w-[100%]
            xs:w-[100%]
            h-[611px]
          "
        >
          <div className="flex w-full flex-col bg-none h-full">
            {colors.map((color) => (
              <Tabs key={color} color={color} aria-label="Tabs colors" radius="90%"
                classNames={{ 
                  tabList: 'w-full h-[50px] bg-transparent items-center justify-between mx-auto',
                  tab: 'p-5 h-10 text-md font-semibold text-[#7F00FF] rounded-xl',
                  cursor: 'bg-[#7F00FF] rounded-xl',
                  panel: 'bg-blue-500 w-full h-[611px] bg-white overflow-y-auto overflow-x-hidden',
                }}
              >
                <Tab key="photos" title="Template">
                  <Card shadow="none" fullWidth="true">
                    <CardBody 
                      style={{
                        backgroundColor: '#F8F9F9',
                        boxShadow: 'none',
                      }}
                    >
                      <Templates
                        xPos={xPos}
                        setXPos={setXPos}
                        textAlign={textAlign}
                        setTextAlign={setTextAlign}
                        shadowMode={shadowMode}
                        setShadowMode={setShadowMode}
                        shadowNone={shadowNone}
                        setShadowNone={setShadowNone}
                        shadowS={shadowS}
                        setShadowS={setShadowS}
                        shadowM={shadowM}
                        setShadowM={setShadowM}
                        shadowL={shadowL}
                        setShadowL={setShadowL}
                        caseMode={caseMode}
                        setCaseMode={setCaseMode}
                        myWeight={myWeight}
                        setMyWeight={setMyWeight}
                        fontMode={fontMode}
                        setFontMode={setFontMode}
                        emojiMode={emojiMode}
                        setEmojiMode={setEmojiMode}
                        emojiBottom={emojiBottom}
                        setEmojiBottom={setEmojiBottom}
                        emojiTop={emojiTop}
                        setEmojiTop={setEmojiTop}
                        emojiNone={emojiNone}
                        setEmojiNone={setEmojiNone} 
                        color1={color1} 
                        setColor1={setColor1} 
                        color2={color2} 
                        setColor2={setColor2} 
                        color3={color3} 
                        setColor3={setColor3} 
                        displayMode={displayMode}  
                        setDisplayMode={setDisplayMode} 
                        colorF={colorF} 
                        setColorF={setColorF}  
                        yPos={yPos} 
                        setYPos={setYPos} 
                        captionSize={captionSize} 
                        setCaptionSize={setCaptionSize} 
                        noneAnimation={noneAnimation}
                        setNoneAnimation={setNoneAnimation}
                        popUpAnimation={popUpAnimation}
                        setPopUpAnimation={setPopUpAnimation}
                        animateValue={animateValue}
                        setAnimateValue={setAnimateValue}
                        backgroundColor={backgroundColor}
                        setBackgroundColor={setBackgroundColor}
                        animationSpeed={animationSpeed}
                        setAnimationSpeed={setAnimationSpeed}
                      />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="music" title="Design">
                  <Card shadow="none" fullWidth="true" radius='none'>
                    <CardBody
                      style={{
                        backgroundColor: '#ffffff',
                        boxShadow: 'none',
                      }}
                    >
                      <Style 
                        xPos={xPos}
                        setXPos={setXPos}
                        textAlign={textAlign}
                        setTextAlign={setTextAlign}
                        shadowMode={shadowMode}
                        setShadowMode={setShadowMode}
                        shadowNone={shadowNone}
                        setShadowNone={setShadowNone}
                        shadowS={shadowS}
                        setShadowS={setShadowS}
                        shadowM={shadowM}
                        setShadowM={setShadowM}
                        shadowL={shadowL}
                        setShadowL={setShadowL}
                        caseMode={caseMode}
                        setCaseMode={setCaseMode}
                        myWeight={myWeight}
                        setMyWeight={setMyWeight}
                        fontMode={fontMode}
                        setFontMode={setFontMode}
                        emojiMode={emojiMode}
                        setEmojiMode={setEmojiMode}
                        emojiBottom={emojiBottom}
                        setEmojiBottom={setEmojiBottom}
                        emojiTop={emojiTop}
                        setEmojiTop={setEmojiTop}
                        emojiNone={emojiNone}
                        setEmojiNone={setEmojiNone} 
                        color1={color1} 
                        setColor1={setColor1} 
                        color2={color2} 
                        setColor2={setColor2} 
                        color3={color3} 
                        setColor3={setColor3} 
                        displayMode={displayMode}  
                        setDisplayMode={setDisplayMode} 
                        colorF={colorF} 
                        setColorF={setColorF}  
                        yPos={yPos} 
                        setYPos={setYPos} 
                        captionSize={captionSize} 
                        setCaptionSize={setCaptionSize} 
                        noneAnimation={noneAnimation}
                        setNoneAnimation={setNoneAnimation}
                        popUpAnimation={popUpAnimation}
                        setPopUpAnimation={setPopUpAnimation}
                        animateValue={animateValue}
                        setAnimateValue={setAnimateValue}
                        backgroundColor={backgroundColor}
                        setBackgroundColor={setBackgroundColor}
                        animationSpeed={animationSpeed}
                        setAnimationSpeed={setAnimationSpeed}
                        shadow={shadow}
                        setShadow={setShadow}
                        offsetX={offsetX}
                        setOffsetX={setOffsetX}
                        offsetY={offsetY}
                        setOffsetY={setOffsetY}
                        blur={blur}
                        setBlur={setBlur}
                        shadowColor={shadowColor}
                        setShadowColor={setShadowColor}
                        selectColor={selectColor}
                        setSelectColor={setSelectColor}
                      />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="videos" title="Subtitles">
                  <Card shadow="none" fullWidth="true">
                    <CardBody 
                      style={{
                        backgroundColor: '#F8F9F9',
                        boxShadow: 'none',
                      }}
                    >
                      <TranscriptionEditor
                        srt={srt}
                        setSrt={setSrt}
                        serverVideoUrl={serverVideoUrl}
                        setServerVideoUrl={setServerVideoUrl}
                        line={line} 
                        setLine={setLine}
                      />
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            ))}
          </div>
        </div>

        </div>
    </motion.div>
  );
}