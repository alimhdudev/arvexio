import React, { useState } from 'react';
import CaptionContext from './captionContext';
import './style.css';
import { Inter, Plus_Jakarta_Sans, Montserrat } from 'next/font/google'
import shadows from '@mui/material/styles/shadows';
import Image from 'next/image';
import AnimationNone from './animation-none.svg'
import AnimationBorderFull from './animation-border-full.svg'
import AnimationBorderWord from './animation-border-word.svg'
import AnimationPopUp from './animation-pop-up.svg'
import AnimationColorWord from './animation-color-words.svg'
import AnimationBorderSelect from './animation-border-select.svg'
import AnimationStack from './animation-stack.svg'
import AnimationFadeIn from './animation-fade-in.svg'
import { TbAlignLeft, TbAlignCenter, TbAlignRight } from "react-icons/tb";
import {Tabs, Tab, Card, CardBody} from "../app/edit/lib/nextui.js";
import {Skeleton} from "@nextui-org/react";
import {Select, SelectSection, SelectItem} from "@nextui-org/react";
import {Slider} from "@nextui-org/react";
import { AnimatePresence, animate, animations, motion } from "framer-motion";

const font3 = Plus_Jakarta_Sans({ subsets: ['latin'] })


const Templates = ({
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
    shadowS,
    setShadowS,
    shadowM,
    setShadowM,
    shadowL,
    setShadowL,
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
    setColor1,
    color2,
    setColor2,
    color3,
    setColor3,
    displayMode,
    setDisplayMode,
    colorF,
    setColorF,
    captionSize,
    setCaptionSize,
    yPos,
    setYPos,
    xPos,
    setXPos,
}) => {
    const [borderActive, setBorderActive] = useState(false)
    const [bgColorMode, setBgColorMode] = useState('none'); // Default shadow mode
    const handleCaptionSizeChange = (event) => {
        setCaptionSize(event.target.value);
    };

    const handleCaptionYChange = (event) => {
        setYPos(event.target.value);
    };

    const handleCaptionXChange = (event) => {
        setXPos(event.target.value);
    };

    const handleColorFChange = (event) => {
        setColorF(event.target.value);
    };

    const handleDivClick = () => {
        document.getElementById('hiddenColorInput').click();
    };

    const handleColor1Change = (event) => {
        setColor1(event.target.value);
    };   

    const handleColor2Change = (event) => {
        setColor2(event.target.value);
    };

    const handleColor3Change = (event) => {
        setColor3(event.target.value);
    };

    const handleFontChange = (font) => {
        // Update the font used in your application
        setFontMode(font);
    };

    const handleMyWeight = (font) => {
        // Update the font used in your application
        setMyWeight(font);
    };

    const handleCaseUpper = (event) => {
        // Update the font used in your application
        setCaseMode('uppercase');
    };
    const handleCaseLower = (event) => {
        // Update the font used in your application
        setCaseMode('lowercase');
    };
    const handleCaseNone = (event) => {
        // Update the font used in your application
        setCaseMode('none');
    };

    const handleShadowNone = (event) => {
        // Update the font used in your application
        setShadowMode('none');
    };

    const handleBackgroundColorChange = (event) => {
        setBackgroundColor(event.target.value);
    }; 
    
    const handleAnimationSpeed = (event) => {
        setAnimationSpeed(event.target.value);
    };  
      
    
    const z = 0; // Replace with the number of decimal places you want
    const percentage = (((yPos - 1) / (500 - 1)) * 100).toFixed(z);
    const x = 0; // Replace with the number of decimal places you want
    const Xpercentage = (((xPos - 1) / (500 - 1)) * 100).toFixed(x);

    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);

    const [isHoveredEmo1, setIsHoveredEmo1] = useState(false);
    const [isHoveredEmo2, setIsHoveredEmo2] = useState(false);
    const [isHoveredEmo3, setIsHoveredEmo3] = useState(false);

    const [isHoveredCs1, setIsHoveredCs1] = useState(false);
    const [isHoveredCs2, setIsHoveredCs2] = useState(false);
    const [isHoveredCs3, setIsHoveredCs3] = useState(false);

    const [isHoveredSh1, setIsHoveredSh1] = useState(false);
    const [isHoveredSh2, setIsHoveredSh2] = useState(false);
    const [isHoveredSh3, setIsHoveredSh3] = useState(false);
    const [isHoveredSh4, setIsHoveredSh4] = useState(false);

    const [isHoveredAnNone, setIsHoveredAnNone] = useState(false);
    const [isHoveredBorderFull, setIsHoveredBorderFull] = useState(false);
    const [isHoveredBorderWord, setIsHoveredBorderWord] = useState(false);
    const [isHoveredPopUp, setIsHoveredPopUp] = useState(false);
    const [isHoveredColored, setIsHoveredColored] = useState(false);
    const [isHoveredAppear, setIsHoveredAppear] = useState(false);
    const [isHoveredStack, setIsHoveredStack] = useState(false);
    const [isHoveredFadeIn, setIsHoveredFadeIn] = useState(false);

    const [isHoveredLeft1, setIsHoveredLeft1] = useState(false);
    const [isHoveredCenter2, setIsHoveredCenter2] = useState(false);
    const [isHoveredRight3, setIsHoveredRight3] = useState(false);

    const fonts = [
        { label: 'Montserrat', value: 'Montserrat' },
        { label: 'The Bold Font', value: 'The Bold Font' },
        { label: 'Nunito', value: 'Nunito' },
        { label: 'Poppins', value: 'Poppins' },
        { label: 'Roboto', value: 'Roboto' },
        { label: 'Raleway', value: 'Raleway' },
        { label: 'Rubik', value: 'Rubik' },
        { label: 'Noto Sans', value: 'Noto Sans' },
        { label: 'Futura Std', value: 'Futura Std' },
        { label: 'Bangers', value: 'Bangers' },
        { label: 'Helvetica', value: 'Helvetica' },
        { label: 'Cairo', value: 'Cairo' },
        { label: 'TT Fors Trial', value: 'TT Fors Trial' },
        { label: 'Komika', value: 'Komika' },
        { label: 'Oswald', value: 'Oswald' },
        { label: 'Eurostile', value: 'Eurostile' },
    ];

    const weights = [
        { label: 'Black', value: '900' },
        { label: 'Extra Bold', value: '800' },
        { label: 'Bold', value: '700' },
        { label: 'Semi-Bold', value: '600' },
        { label: 'Medium', value: '500' },
        { label: 'Regular', value: '400' },
        { label: 'Light', value: '300' },
        { label: 'Extra Light', value: '200' },
        { label: 'Thin', value: '100' },
    ];


  return (
    <Card shadow="none" style={{width:'100%',backgroundColor: '#F8F9F9', marginTop:'-5px',boxShadow: 'none', padding: 15,}} className="animations-pick">
    <p style={{color: '#333333',width: '100%', fontWeight:'600'}}>Animation</p>
        <div 
            style={{
                display: 'flex',
                width: '99%',
                justifyContent: 'space-between',
                marginTop: '10px',
                borderRadius: '8px',
                overflow: 'hidden',
                fontFamily: font3,
                flexDirection: 'column',
            }}
        >
                {/* Row 1 */}
                <div
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    {/* Animation None */}
                    <div
                        className='animation-none'
                        style={{
                            display: 'flex',
                            placeItems: 'center',
                            flexDirection: 'column'
                        }}
                    >   
                        <button 
                            className='animation-none'
                            style={{
                                width: '95px',
                                height: '95px',
                                backgroundColor: '#323234',
                                marginBottom: '2px',
                                border: bgColorMode==='none' ? '5px solid #9900EE' : '',
                                borderRadius: '17px',
                                backgroundColor: isHoveredAnNone ? '#F1F2F5' : '#FFFFFF',
                                fontFamily: font3,
                            }}
                            onMouseEnter={() => setIsHoveredAnNone(true)}
                            onMouseLeave={() => setIsHoveredAnNone(false)}                    
                            onClick={() => {
                                setBgColorMode('none');
                                setAnimateValue('none');
                                setColor1('#ffffff');
                                setColor2('#ffffff');
                                setColor3('#ffffff');
                                setShadowMode(shadowL);
                                setEmojiMode('none');
                                setTextAlign('center');
                            }}
                        >
                            <Image
                                src={AnimationNone}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                alt='img'
                            />
                        </button>
                    </div>
                    {/* AnimationBorderFull */}
                    <div
                        className='animation-border-full'
                        style={{
                            display: 'flex',
                            placeItems: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        <button 
                            className='animation-border-full'
                            style={{
                                width: '95px',
                                height: '95px',
                                backgroundColor: '#323234',
                                marginBottom: '2px',
                                border: bgColorMode==='borderFull' ? '5px solid #9900EE' : '',
                                borderRadius: '17px',
                                backgroundColor: isHoveredAnNone ? '#F1F2F5' : '#FFFFFF',
                                fontFamily: font3,
                            }}
                            onMouseEnter={() => setIsHoveredBorderFull(true)}
                            onMouseLeave={() => setIsHoveredBorderFull(false)}                    
                            onClick={() => {
                                setBgColorMode('borderFull');
                                setAnimateValue('borderfull');
                                setColor1('#FFFFFF');
                                setColor2('#FFFFFF');
                                setColor3('#FFFFFF');
                                setShadowMode('none');
                                setEmojiMode('none');
                                setTextAlign('center');
                            }}
                        >
                            <Image
                                src={AnimationBorderFull}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                alt='img'
                            />
                        </button>
                    </div>
                    {/* AnimationBorderWord */}
                    <div
                        className='animation-border-word'
                        style={{
                            display: 'flex',
                            placeItems: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        <button 
                            className='animation-border-word'
                            style={{
                                width: '95px',
                                height: '95px',
                                backgroundColor: '#323234',
                                marginBottom: '2px',
                                border: bgColorMode==='borderWord' ? '5px solid #9900EE' : '',
                                borderRadius: '17px',
                                backgroundColor: isHoveredAnNone ? '#F1F2F5' : '#FFFFFF',
                                fontFamily: font3,
                            }}
                            onMouseEnter={() => setIsHoveredBorderWord(true)}
                            onMouseLeave={() => setIsHoveredBorderWord(false)}                    
                            onClick={() => {
                                setBgColorMode('borderWord');
                                setAnimateValue('borderword');
                                setColor1('#FFFFFF');
                                setColor2('#FFFFFF');
                                setColor3('#FFFFFF');
                                setShadowMode(shadowM);
                                setEmojiMode('top');
                                setTextAlign('center');
                            }}
                        >
                            <Image
                                src={AnimationBorderWord}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                alt='img'
                            />
                        </button>
                    </div>
                </div>
        </div>     
    </Card>
  )
}

export default Templates