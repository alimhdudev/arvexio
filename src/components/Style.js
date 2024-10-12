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
import {ShadowPicker} from "react-shadow-picker";

const font3 = Plus_Jakarta_Sans({ subsets: ['latin'] })

const Style = ({
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
    shadow,
    setShadow,
    offsetX,
    setOffsetX,
    offsetY,
    setOffsetY,
    blur,
    setBlur,
    shadowColor,
    setShadowColor,
    selectColor,
    setSelectColor,
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

    const handleSelectColorChange = (event) => {
        setSelectColor(event.target.value);
    }; 
    
    const handleAnimationSpeed = (event) => {
        setAnimationSpeed(event.target.value);
    };  

    const handleOffsetXChange = (event) => {
        setOffsetX(event.target.value);
    };

    const handleOffsetYChange = (event) => {
        setOffsetY(event.target.value);
    };

    const handleBlurChange = (event) => {
        setBlur(event.target.value);
    };

    const handleShadowColorChange = (event) => {
        setShadowColor(event.target.value);
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
        // Style Tab
        <div class={font3.className} style={{width: '100%'}}>
            {/* Tool items container */}
            <Card className='tool-items flex flex-row' shadow="none" style={{width:'100%',backgroundColor: '#F8F9F9', marginTop:'-12px', padding: 10,}} classNames={{boxShadow: 'none'}}>
                {/* Color pick */}
                <div className='color' style={{display:"flex",padding: 10, borderRadius: '8px',flexDirection: 'row', width:'50%', alignItems: 'center', justifyContent:'space-between',}}>
                    <p style={{color: '#333333', fontWeight:'600'}}>Color</p>
                    <div style={{ position: 'relative', width: 'fit-content', height: 'fit-content' }}>
                        <label htmlFor="hiddenColorInput" style={{
                            display: 'block',
                            width:'80px', 
                            height:'30px',
                            borderRadius: '8px',
                            backgroundColor: colorF,
                            alignItems: 'center',
                            border: 'none',
                            cursor: 'pointer',
                        }}>
                        </label>
                        <input
                            type="color"
                            id="hiddenColorInput"
                            value={colorF}
                            onChange={handleColorFChange}
                            style={{ 
                                position: 'absolute',
                                top: '0', 
                                left: '0', 
                                opacity: '0',
                                backgroundColor: 'green',
                            }}
                        />
                    </div>
                </div>
            </Card>

            <Card className='size' style={{boxShadow: 'none',backgroundColor: '#F8F9F9',display:"flex", padding: 20, height:"86px", width:'100%', alignItems: 'center', justifyContent:'space-between', flexDirection: 'row', marginTop: '15px'}}>
                <div className='color' style={{display:"flex", borderRadius: '8px',flexDirection: 'row', width:'50%', alignItems: 'center', justifyContent:'space-between',}}>
                    <p className='text-black' style={{color: '#333333', fontWeight:'600',}}>Size</p>
                    <input
                        type="range"
                        min="10"
                        max="50"
                        value={captionSize}
                        onChange={handleCaptionSizeChange}
                        style={{
                            width: '90px',
                            height: '5px',
                            appearance: 'auto',
                        }}
                    />
                </div>
            </Card>
            
            {/* Display words: 2 lines, 1 line, 1 word */}
            <Card shadow="none" style={{width:'100%',backgroundColor: '#F8F9F9',boxShadow: 'none', marginTop:'15px', padding: 20}} className='display-caption'>
                <p style={{color: '#333333',width: '100%', fontWeight:'600'}}>Display</p>
                <div 
                    style={{
                        display: 'flex',
                        width: '100%',
                        overflow: 'hidden',
                        fontFamily: font3,
                        marginTop: 10,
                    }}
                >
                    <Tabs 
                        key={"secondary"} 
                        color={"secondary"} 
                        aria-label="Tabs colors" 
                        defaultSelectedKey={'Word'}
                        radius="90%"
                        style={{width: '100%'}}
                        classNames={{ 
                            tabList: 'w-full h-[50px] bg-transparent items-center justify-between mx-auto',
                            tab: 'p-5 h-10 text-md font-semibold text-[#7F00FF] bg-white rounded-xl',
                            cursor: 'bg-[#7F00FF] rounded-xl',
                            panel: 'bg-blue-500 w-full h-[611px] bg-white overflow-y-auto overflow-x-hidden',
                        }}
                        onSelectionChange={(selectedKey) => {
                            selectedKey === '2 Rows' ? setDisplayMode('2 lines') :
                            selectedKey === '1 Row' ? setDisplayMode('1 line') :
                            selectedKey === 'Word' ? setDisplayMode('1 word') :
                            setDisplayMode('1 word') // Add a default case here
                        }}
                    >
                        <Tab key="2 Rows" title="2 Rows"/>
                        <Tab key="1 Row" title="1 Row"/>
                        <Tab key="Word" title="Word"/>
                    </Tabs>
                </div>
            </Card>

            <Card shadow="none" style={{width:'100%',backgroundColor: '#F8F9F9',boxShadow: 'none', marginTop:'15px', padding: 20}} className='emoji'>
                <p style={{color: '#333333',width: '100%', fontWeight:'600'}}>Emoji</p>
                <div 
                    style={{
                        display: 'flex',
                        width: '100%',
                        overflow: 'hidden',
                        fontFamily: font3,
                        marginTop: 10,
                    }}
                >
                    <Tabs 
                        key={"secondary"} 
                        color={"secondary"} 
                        aria-label="Tabs colors" 
                        radius="90%"
                        defaultSelectedKey={'none'}
                        style={{width: '100%'}}
                        classNames={{ 
                            tabList: 'w-full h-[50px] bg-transparent items-center justify-between mx-auto',
                            tab: 'p-5 h-10 text-md font-semibold text-[#7F00FF] bg-white rounded-xl',
                            cursor: 'bg-[#7F00FF] rounded-xl',
                            panel: 'bg-blue-500 w-full h-[611px] bg-white overflow-y-auto overflow-x-hidden',
                        }}
                        onSelectionChange={(selectedKey) => {
                            selectedKey === 'top' ? setEmojiMode('top') :
                            selectedKey === 'bottom' ? setEmojiMode('bottom') :
                            selectedKey === 'none' ? setEmojiMode('none') :
                            setEmojiMode('top'); // Add a default case here
                        }}
                    >
                        <Tab key="top" title="Top"/>
                        <Tab key="bottom" title="Bottom"/>
                        <Tab key="none" title="None"/>
                    </Tabs>
                </div>
            </Card>

            <Card shadow="none" className="fonts" style={{width:'100%', padding: 10,boxShadow: 'none',backgroundColor: '#F8F9F9', marginTop: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} >
                <p style={{color: '#333333',width: '100%',width: 'fit-content', marginLeft: 10, marginRight: 30, fontWeight:'600'}}>Font</p>
                <div 
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        fontFamily: font3,
                        color: '#7F00FF',
                    }}
                >
                    <Select 
                        label="" 
                        size="small"
                        value="Montserrat"
                        defaultSelectedKeys="Montserrat"
                        style={{width:'90%', height: '50%', backgroundColor:'white',color: '#000000'}}
                        onChange={(event) => handleFontChange(event.target.value)}
                        fullWidth={'true'}
                    >
                        {fonts.map((font) => (
                        <SelectItem key={font.value} value={font.value} font={font.value}>
                            {font.label}
                        </SelectItem>
                        ))}
                    </Select>

                    <Select 
                        label="" 
                        size="small"
                        color="default"
                        style={{width:'90%', height: '50%', backgroundColor:'white', color: '#000000', textSize: '10px'}} 
                        onChange={(event) => handleMyWeight(event.target.value)}
                    >
                        {weights.map((weight) => (
                        <SelectItem key={weight.value} value={weight.value} style={{color: '#000000'}}>
                            {weight.label}
                        </SelectItem>
                        ))}
                    </Select>
                </div>
            </Card>

            <Card shadow="none" style={{width:'100%',backgroundColor: '#F8F9F9',boxShadow: 'none', marginTop:'15px', padding: 20}} className='case'>
                <p style={{color: '#333333',width: '100%', fontWeight:'600'}}>Case</p>
                <div 
                    style={{
                        display: 'flex',
                        width: '100%',
                        overflow: 'hidden',
                        fontFamily: font3,
                        marginTop: 10,
                    }}
                >
                    <Tabs 
                        key={"secondary"} 
                        color={"secondary"} 
                        aria-label="Tabs colors" 
                        radius="90%"
                        style={{width: '100%'}}
                        defaultSelectedKey={'upper'}
                        classNames={{ 
                            tabList: 'w-full h-[50px] bg-transparent items-center justify-between mx-auto',
                            tab: 'p-5 h-10 text-md font-semibold text-[#7F00FF] bg-white rounded-xl',
                            cursor: 'bg-[#7F00FF] rounded-xl',
                            panel: 'bg-blue-500 w-full h-[611px] bg-white overflow-y-auto overflow-x-hidden',
                        }}
                        onSelectionChange={(selectedKey) => {
                            selectedKey === 'upper' ? handleCaseUpper('uppercase') :
                            selectedKey === 'lower' ? handleCaseLower('lowercase') :
                            selectedKey === 'none' ? handleCaseNone('normal') :
                            handleCaseUpper('uppercase'); // Add a default case here
                        }}
                    >
                        <Tab key="upper" title="Upper"/>
                        <Tab key="lower" title="Lower"/>
                        <Tab key="none" title="None"/>
                    </Tabs>
                </div>
            </Card>

            <Card shadow="none" style={{width:'100%',backgroundColor: '#F8F9F9',boxShadow: 'none', marginTop:'15px', padding: 20}} className='shadowPicker'>
                <p style={{color: '#333333',width: '100%', fontWeight:'600'}}>Shadow</p>
                {/* Offset X */}
                <div className='color' style={{display:"flex", borderRadius: '8px',flexDirection: 'row', width:'60%', alignItems: 'center', justifyContent:'space-between', marginTop: '10px'}}>
                    <p className='text-black' style={{color: '#333333', fontWeight:'500',}}>Offset X</p>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={offsetX}
                        onChange={handleOffsetXChange}
                        style={{
                            width: '90px',
                            height: '5px',
                            appearance: 'auto',
                        }}
                    />
                </div>
                {/* Offset Y */}
                <div className='color' style={{display:"flex", borderRadius: '8px',flexDirection: 'row', width:'60%', alignItems: 'center', justifyContent:'space-between', marginTop: '10px'}}>
                    <p className='text-black' style={{color: '#333333', fontWeight:'500',}}>Offset Y</p>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={offsetY}
                        onChange={handleOffsetYChange}
                        style={{
                            width: '90px',
                            height: '5px',
                            appearance: 'auto',
                        }}
                    />
                </div>
                {/* Blur */}
                <div className='color' style={{display:"flex", borderRadius: '8px',flexDirection: 'row', width:'60%', alignItems: 'center', justifyContent:'space-between', marginTop: '10px'}}>
                    <p className='text-black' style={{color: '#333333', fontWeight:'500',}}>Blur</p>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={blur}
                        onChange={handleBlurChange}
                        style={{
                            width: '90px',
                            height: '5px',
                            appearance: 'auto',
                        }}
                    />
                </div>
                {/* Color */}
                <div className='color' style={{display:"flex", borderRadius: '8px',flexDirection: 'row', width:'60%', alignItems: 'center', justifyContent:'space-between', marginTop: '10px'}}>
                    <p style={{color: '#333333', fontWeight:'500'}}>Color</p>
                    <div style={{ position: 'relative', width: 'fit-content', height: 'fit-content' }}>
                        <label htmlFor="hiddenColorInput" style={{
                            display: 'block',
                            width:'80px', 
                            height:'30px',
                            borderRadius: '8px',
                            backgroundColor: shadowColor,
                            alignItems: 'center',
                            border: 'none',
                            cursor: 'pointer',
                        }}>
                        </label>
                        <input
                            type="color"
                            id="hiddenColorInput"
                            value={shadowColor}
                            onChange={handleShadowColorChange}
                            style={{ 
                                position: 'absolute',
                                top: '0', 
                                left: '0', 
                                opacity: '0',
                                backgroundColor: 'green',
                            }}
                        />
                    </div>
                </div>

            </Card>

            { bgColorMode === 'borderFull' ? 
            (
                <motion.div   
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}>
                    {/* <p className='text-black' style={{color:"#000000",marginBottom:'-10px'}}>Size</p> */}
                    <Card className='tool-items flex flex-row' shadow="none" style={{width:'100%',backgroundColor: '#F8F9F9', marginTop:'15px', padding: 10,}} classNames={{boxShadow: 'none'}}>
                        {/* Color pick */}
                        <div className='color' style={{display:"flex",padding: 10, borderRadius: '8px',flexDirection: 'row', width:'80%', alignItems: 'center', justifyContent:'space-between',}}>
                            <p style={{color: '#333333', fontWeight:'600'}}>Background Color</p>
                            <div style={{ position: 'relative', width: 'fit-content', height: 'fit-content' }}>
                                <label htmlFor="hiddenColorInputBg" style={{
                                    display: 'block',
                                    width:'80px', 
                                    height:'30px',
                                    borderRadius: '8px',
                                    backgroundColor: backgroundColor,
                                    alignItems: 'center',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}>
                                </label>
                                <input
                                    type="color"
                                    id="hiddenColorInputBg"
                                    value={backgroundColor}
                                    onChange={handleBackgroundColorChange}
                                    style={{ 
                                        position: 'absolute',
                                        top: '0', 
                                        left: '0', 
                                        opacity: '0',
                                        backgroundColor: 'green',
                                    }}
                                />
                            </div>
                        </div>
                    </Card>
                </motion.div   >
            ) : null
            }

            { bgColorMode === 'borderWord' ? 
            (
                <motion.div   
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}>
                    {/* <p className='text-black' style={{color:"#000000",marginBottom:'-10px'}}>Size</p> */}
                    <Card className='tool-items flex flex-row' shadow="none" style={{width:'100%',backgroundColor: '#F8F9F9', marginTop:'15px', padding: 10,}} classNames={{boxShadow: 'none'}}>
                        {/* Color pick */}
                        <div className='color' style={{display:"flex",padding: 10, borderRadius: '8px',flexDirection: 'row', width:'80%', alignItems: 'center', justifyContent:'space-between',}}>
                            <p style={{color: '#333333', fontWeight:'600'}}>Background Color</p>
                            <div style={{ position: 'relative', width: 'fit-content', height: 'fit-content' }}>
                                <label htmlFor="hiddenColorInputBg" style={{
                                    display: 'block',
                                    width:'80px', 
                                    height:'30px',
                                    borderRadius: '8px',
                                    backgroundColor: backgroundColor,
                                    alignItems: 'center',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}>
                                </label>
                                <input
                                    type="color"
                                    id="hiddenColorInputBg"
                                    value={backgroundColor}
                                    onChange={handleBackgroundColorChange}
                                    style={{ 
                                        position: 'absolute',
                                        top: '0', 
                                        left: '0', 
                                        opacity: '0',
                                        backgroundColor: 'green',
                                    }}
                                />
                            </div>
                        </div>
                    </Card>
                </motion.div   >
            ) : null
            }

            { animateValue === 'appear' ? 
            (
                <motion.div   
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}>
                    {/* <p className='text-black' style={{color:"#000000",marginBottom:'-10px'}}>Size</p> */}
                    <Card className='tool-items flex flex-row' shadow="none" style={{width:'100%',backgroundColor: '#F8F9F9', marginTop:'15px', padding: 10,}} classNames={{boxShadow: 'none'}}>
                        {/* Color pick */}
                        <div className='color' style={{display:"flex",padding: 10, borderRadius: '8px',flexDirection: 'row', width:'80%', alignItems: 'center', justifyContent:'space-between',}}>
                            <p style={{color: '#333333', fontWeight:'600'}}>Background Color</p>
                            <div style={{ position: 'relative', width: 'fit-content', height: 'fit-content' }}>
                                <label htmlFor="hiddenColorInputBg" style={{
                                    display: 'block',
                                    width:'80px', 
                                    height:'30px',
                                    borderRadius: '8px',
                                    backgroundColor: selectColor,
                                    alignItems: 'center',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}>
                                </label>
                                <input
                                    type="color"
                                    id="hiddenColorInputBg"
                                    value={selectColor}
                                    onChange={handleSelectColorChange}
                                    style={{ 
                                        position: 'absolute',
                                        top: '0', 
                                        left: '0', 
                                        opacity: '0',
                                        backgroundColor: 'green',
                                    }}
                                />
                            </div>
                        </div>
                    </Card>
                </motion.div   >
            ) : null
            }

            { bgColorMode === 'colorWords' ? 
            (
                <motion.div   
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className='max-w-full flex flex-row items-center justify-between overflow-hidden' 
                    style={{marginTop: '15px'}}
                >
                <Card style={{ position: 'relative', width: 'fit-content', height: 'fit-content',boxShadow: 'none',backgroundColor: '#F8F9F9',display:"flex", padding: 13 }}>
                    <p style={{color: '#333333', fontWeight:'600', marginBottom: 10}}>Main</p>
                    <div style={{ position: 'relative' }}>
                        <label htmlFor="hiddenColorInput1" style={{
                            display: 'block',
                            width:'80px', 
                            height:'30px',
                            borderRadius: '8px',
                            backgroundColor: color1,
                            alignItems: 'center',
                            border: 'none',
                            cursor: 'pointer',
                        }}>
                        </label>
                        <input
                            type="color"
                            id="hiddenColorInput1"
                            value={color1}
                            onChange={handleColor1Change}
                            style={{ 
                                position: 'absolute', 
                                top: '0', 
                                left: '0', 
                                opacity: '0' 
                            }}
                        />
                    </div>
                </Card>
                <Card style={{ position: 'relative', width: 'fit-content', height: 'fit-content',boxShadow: 'none',backgroundColor: '#F8F9F9',display:"flex", padding: 13  }}>
                    <p style={{color: '#333333', fontWeight:'600', marginBottom: 10}}>Second</p>
                    <div style={{ position: 'relative' }}>
                        <label htmlFor="hiddenColorInput2" style={{
                            display: 'block',
                            width:'80px', 
                            height:'30px',
                            borderRadius: '8px',
                            backgroundColor: color2,
                            alignItems: 'center',
                            border: 'none',
                            cursor: 'pointer',
                        }}>
                        </label>
                        <input
                            type="color"
                            id="hiddenColorInput2"
                            value={color2}
                            onChange={handleColor2Change}
                            style={{ 
                                position: 'absolute', 
                                top: '0', 
                                left: '0', 
                                opacity: '0' 
                            }}
                        />
                    </div>
                </Card>
                <Card style={{ position: 'relative', width: 'fit-content', height: 'fit-content',boxShadow: 'none',backgroundColor: '#F8F9F9',display:"flex", padding: 13  }}>
                    <p style={{color: '#333333', fontWeight:'600', marginBottom: 10}}>Third</p>
                    <div style={{ position: 'relative' }}>
                        <label htmlFor="hiddenColorInput3" style={{
                            display: 'block',
                            width:'80px', 
                            height:'30px',
                            borderRadius: '8px',
                            backgroundColor: color3,
                            alignItems: 'center',
                            border: 'none',
                            cursor: 'pointer',
                        }}>
                        </label>
                        <input
                            type="color"
                            id="hiddenColorInput3"
                            value={color3}
                            onChange={handleColor3Change}
                            style={{ 
                                position: 'absolute', 
                                top: '0', 
                                left: '0', 
                                opacity: '0' 
                            }}
                        />
                    </div>
                </Card>
                </motion.div>
            ) : null 
            }

            { bgColorMode === 'stackAnimation' ?
            (
                <motion.div   
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card shadow="none" style={{width:'100%',backgroundColor: '#F8F9F9',boxShadow: 'none', marginTop:'15px'}}>
                        <div className="case" style={{marginTop: '15px'}}>
                            <p style={{color: '#333333',width: '100%', fontWeight:'600'}}>Align</p>
                            <div 
                                style={{
                                    display: 'flex',
                                    width: '99%',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#FFFFFF', // Slightly grayed white
                                    border: '1px solid #CCCED7', // Black border
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    fontFamily: font3,
                                }}
                            >
                                <button 
                                    onMouseEnter={() => setIsHoveredLeft1(true)}
                                    onMouseLeave={() => setIsHoveredLeft1(false)}                    
                                    style={{
                                        paddingTop: '5px',
                                        paddingBottom: '5px',
                                        marginLeft: '1px',
                                        color: '#000000',
                                        width: '33%',
                                        color: textAlign === 'left' ? '#9900EE' : '#2A2A2A',
                                        backgroundColor: isHoveredLeft1 ? '#F1F2F5' : '#FFFFFF',
                                        fontFamily: font3,
                                        alignItems: 'center',
                                    }}
                                    onClick={() => setTextAlign('left')}
                                >
                                    Left
                                </button>

                                <button 
                                    onMouseEnter={() => setIsHoveredCenter2(true)}
                                    onMouseLeave={() => setIsHoveredCenter2(false)}
                                    style={{
                                        borderLeft: '1px solid #CCCED7',
                                        borderRight: '1px solid #CCCED7',
                                        paddingTop: '5px',
                                        paddingBottom: '5px',
                                        marginLeft: '1px',
                                        color: textAlign === 'center' ? '#9900EE' : '#2A2A2A',
                                        backgroundColor: isHoveredCenter2 ? '#F1F2F5' : '#FFFFFF', // Changes color when hovered
                                        alignItems: 'center',
                                        width: '33%',
                                        fontFamily: font3,
                                }}

                                    onClick={() => setTextAlign('center')}
                                >
                                    Center
                                </button>

                                <button 
                                    onMouseEnter={() => setIsHoveredRight3(true)}
                                    onMouseLeave={() => setIsHoveredRight3(false)}
                                    style={{
                                        paddingTop: '5px',
                                        paddingBottom: '5px',
                                        marginLeft: '1px',
                                        color: '#000000',
                                        alignItems: 'center',
                                        width: '33%',
                                        color: textAlign === 'right' ? '#9900EE' : '#2A2A2A',
                                        backgroundColor: isHoveredRight3 ? '#F1F2F5' : '#FFFFFF',
                                        fontFamily: font3,
                                    }}
                                    onClick={() => setTextAlign('right')}
                                >
                                    Right
                                </button>
                            </div>
                        </div>
                        <div className='tool-items flex flex-row' style={{width:'110%'}}>
                            <div className='positionY' style={{display:"flex", height:"86px", width:'190px', alignItems: 'start', justifyContent:'space-between', flexDirection: 'column', marginTop: '5px'}}>
                                <p className='text-black' style={{color:"#000000",marginBottom:'-10px'}}>Position Y</p>
                                <div style={{width:'100px', height:'70px'}} className='flex flex-row items-center'>
                                    <input
                                        type="text"
                                        value={`${percentage}`}
                                        onChange={e => setYPos(e.target.value)}
                                        style={{
                                            marginLeft: '10px',
                                            backgroundColor: '#F1F2F5', // Slightly grayed white
                                            border: '1px solid #CCCED7', // Black border
                                            borderRadius: '8px',
                                            padding: '5px',
                                            marginLeft: '1px',
                                            color: '#000000',
                                            width: '70%',
                                            alignItems: 'center',
                                        }}
                                    />
                                    <p style={{color:"#000000", marginLeft:'7px'}}>%</p>
                                </div>
                                <input
                                type="range"
                                min="-500"
                                max="500"
                                className='input-rr'
                                value={yPos}
                                style={{
                                    width: '90px',
                                    height: '5px',
                                    backgroundColor: '#F1F2F5'
                                }}
                                onChange={handleCaptionYChange}
                                />
                            </div>
                            <div className='positionX' style={{display:"flex", height:"86px", width:'190px', alignItems: 'start', justifyContent:'space-between', flexDirection: 'column', marginTop: '5px'}}>
                                <p className='text-black' style={{color:"#000000",marginBottom:'-10px'}}>Position X</p>
                                <div style={{width:'100px', height:'70px'}} className='flex flex-row items-center'>
                                    <input
                                        type="number"
                                        onChange={e => setXPos(e.target.value)}
                                        value={`${Xpercentage}`}
                                        style={{
                                            marginLeft: '10px',
                                            backgroundColor: '#F1F2F5', // Slightly grayed white
                                            border: '1px solid #CCCED7', // Black border
                                            borderRadius: '8px',
                                            padding: '5px',
                                            marginLeft: '1px',
                                            color: '#000000',
                                            width: '70%',
                                            alignItems: 'center',
                                        }}
                                    />
                                    <p style={{color:"#000000", marginLeft:'7px'}}>%</p>
                                </div>
                                <input
                                type="range"
                                min="-500"
                                max="500"
                                className='input-rr'
                                value={xPos}
                                style={{
                                    width: '90px',
                                    height: '5px',
                                    backgroundColor: '#F1F2F5'
                                }}
                                onChange={handleCaptionXChange}
                                />
                            </div>
                        </div>
                        
                    </Card>
                </motion.div>
            ) : null
            }

            <Card shadow="none" style={{width:'100%',backgroundColor: '#F8F9F9', marginTop:'15px',boxShadow: 'none', padding: 20,}} className="animations-pick">
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
                        {/* First Row */}
                        <div
                            style={{
                                width: '100%%',
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
                                        width: '70px',
                                        height: '70px',
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
                                        width: '70px',
                                        height: '70px',
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
                                        width: '70px',
                                        height: '70px',
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
                            {/* AnimationPopUp */}
                            <div
                                className='animation-pop-up'
                                style={{
                                    display: 'flex',
                                    placeItems: 'center',
                                    flexDirection: 'column'
                                }}
                            >
                                <button 
                                    className='animation-pop-up'
                                    style={{
                                        width: '70px',
                                        height: '70px',
                                        backgroundColor: '#323234',
                                        marginBottom: '2px',
                                        border: bgColorMode==='popUp' ? '5px solid #9900EE' : '',
                                        borderRadius: '17px',
                                        backgroundColor: isHoveredPopUp ? '#F1F2F5' : '#FFFFFF',
                                        fontFamily: font3,
                                    }}
                                    onMouseEnter={() => setIsHoveredPopUp(true)}
                                    onMouseLeave={() => setIsHoveredPopUp(false)}                    
                                    onClick={() => {
                                        setBgColorMode('popUp');
                                        setAnimateValue('popup');
                                        setColor1('#ffffff');
                                        setColor2('#ffffff');
                                        setColor3('#ffffff');
                                        setShadowMode(shadowL);
                                        setEmojiMode('none');
                                        setTextAlign('center');
                                    }}
                                >
                                    <Image
                                        src={AnimationPopUp}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        alt='img'
                                    />
                                </button>
                            </div>
                        </div>
                        {/* Second Row */}
                        <div
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: '7px',
                            }}
                        >
                            {/* Animation Color Words */}
                            <div
                                className='animation-color-words'
                                style={{
                                    display: 'flex',
                                    placeItems: 'center',
                                    flexDirection: 'column'
                                }}
                            >
                                <button 
                                    className='animation-color-words'
                                    style={{
                                        width: '70px',
                                        height: '70px',
                                        backgroundColor: '#323234',
                                        marginBottom: '2px',
                                        border: bgColorMode==='colorWords' ? '5px solid #9900EE' : '',
                                        borderRadius: '17px',
                                        backgroundColor: isHoveredAnNone ? '#F1F2F5' : '#FFFFFF',
                                        fontFamily: font3,
                                    }}
                                    onMouseEnter={() => setIsHoveredColored(true)}
                                    onMouseLeave={() => setIsHoveredColored(false)}                    
                                    onClick={() => {
                                        setBgColorMode('colorWords');
                                        setAnimateValue('colored');
                                        setColor1('#00FF00');
                                        setColor2('#F0FF00');
                                        setColor3('#EA291B');
                                        setShadowMode(shadowL);
                                        setEmojiMode('none');
                                        setTextAlign('center');
                                    }}
                                >
                                    <Image
                                        src={AnimationColorWord}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        alt='img'
                                    />
                                </button>
                            </div>
                            {/* Animation Border Select */}
                            <div
                                className='animation-border-select'
                                style={{
                                    display: 'flex',
                                    placeItems: 'center',
                                    flexDirection: 'column'
                                }}
                            >
                                <button 
                                    className='animation-border-select'
                                    style={{
                                        width: '70px',
                                        height: '70px',
                                        backgroundColor: '#323234',
                                        marginBottom: '2px',
                                        border: bgColorMode==='borderSelect' ? '5px solid #9900EE' : '',
                                        borderRadius: '17px',
                                        backgroundColor: isHoveredAnNone ? '#F1F2F5' : '#FFFFFF',
                                        fontFamily: font3,
                                    }}
                                    onMouseEnter={() => setIsHoveredAppear(true)}
                                    onMouseLeave={() => setIsHoveredAppear(false)}                    
                                    onClick={() => {
                                        setBgColorMode('borderSelect');
                                        setAnimateValue('appear');
                                        setColor1('#FFFFFF');
                                        setColor2('#FFFFFF');
                                        setColor3('#FFFFFF');
                                        setShadowMode('none');
                                        setEmojiMode('top');
                                        setTextAlign('center');
                                    }}
                                >
                                    <Image
                                        src={AnimationBorderSelect}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        alt='img'
                                    />
                                </button>
                            </div>
                            {/* Animation Stack */}
                            <div
                                className='animation-stack'
                                style={{
                                    display: 'flex',
                                    placeItems: 'center',
                                    flexDirection: 'column'
                                }}
                            >
                                <button 
                                    className='animation-stack'
                                    style={{
                                        width: '70px',
                                        height: '70px',
                                        backgroundColor: '#323234',
                                        marginBottom: '2px',
                                        border: bgColorMode==='stackAnimation' ? '5px solid #9900EE' : '',
                                        borderRadius: '17px',
                                        backgroundColor: isHoveredAnNone ? '#F1F2F5' : '#FFFFFF',
                                        fontFamily: font3,
                                    }}
                                    onMouseEnter={() => setIsHoveredStack(true)}
                                    onMouseLeave={() => setIsHoveredStack(false)}                    
                                    onClick={() => {
                                        setBgColorMode('stackAnimation');
                                        setAnimateValue('stack');
                                        setColor1('#FFFFFF');
                                        setColor2('#FFFFFF');
                                        setColor3('#FFFFFF');
                                        setShadowMode(shadowM);
                                        setEmojiMode('top');
                                        setTextAlign('left');
                                    }}
                                >
                                    <Image
                                        src={AnimationStack}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        alt='img'
                                    />
                                </button>
                            </div>
                            {/* Animation Fade In */}
                            <div
                                className='animation-fade-in'
                                style={{
                                    display: 'flex',
                                    placeItems: 'center',
                                    flexDirection: 'column'
                                }}
                            >
                                <button 
                                    className='animation-fade-in'
                                    style={{
                                        width: '70px',
                                        height: '70px',
                                        backgroundColor: '#323234',
                                        marginBottom: '2px',
                                        border: bgColorMode==='fadeInAnimation' ? '5px solid #9900EE' : '',
                                        borderRadius: '17px',
                                        backgroundColor: isHoveredAnNone ? '#F1F2F5' : '#FFFFFF',
                                        fontFamily: font3,
                                    }}
                                    onMouseEnter={() => setIsHoveredFadeIn(true)}
                                    onMouseLeave={() => setIsHoveredFadeIn(false)}                    
                                    onClick={() => {
                                        setBgColorMode('fadeInAnimation');
                                        setAnimateValue('fadein');
                                        setColor1('#FFFFFF');
                                        setColor2('#FFFFFF');
                                        setColor3('#FFFFFF');
                                        setShadowMode(shadowM);
                                        setEmojiMode('top');
                                        setTextAlign('center');
                                    }}
                                >
                                    <Image
                                        src={AnimationFadeIn}
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

        </div>
    );
};

export default Style;