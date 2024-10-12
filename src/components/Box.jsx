import React from 'react';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import { TiArrowRight } from "react-icons/ti";
import { Inter, Plus_Jakarta_Sans, Montserrat, Syne } from 'next/font/google';
import '../app/styles/globals.css'
import axios from 'axios';

const font = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['200', '300', '400', '500', '600', '700', '800']
});

const Box = ({ name, func, price, icon, subicon, videosLimit, mbLimit, lengthLimit, stylesLimit, link, }) => {

  return (
    <div className='shadow-xl' style={{ padding: 15,marginLeft: 'auto', marginRight: 'auto', width: '320px', height: '480px', borderRadius: 25, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #EAECF0'}}>
      <div className=''>
        <div className=' flex flex-row items-center justify-between text-left' style={{width: '250px', marginTop: 30}}>
          <p style={{ textAlign: 'center', fontSize: 25, color: 'black', fontWeight: '600' }}>{name}</p>
          <Image src={icon} width={20} height={20} style={{width: '50px', height: '50px'}} alt='Icon'/>
        </div>
        <div className='w-fit h-fit' style={{ alignItems: 'center', display: 'flex', flexDirection: 'start', alignItems: 'center', justifyContent: 'space-between'}}>
          <p className='jakarta' style={{ margin: 'auto', fontSize: 35, fontWeight: 'bold', color: '#9730FF'}}>{price}</p>
          <p className=''  style={{ margin: 'auto', fontSize: 17, color: 'black', fontWeight: 'bold', color: '#857E94', marginLeft: '10px', marginTop: '10px'}}>/ month</p>
        </div>
      </div>

      <hr style={{ 
        border: 'none',
        height: '1px',
        width: '80%', // Adjust the width as needed
        margin: '20px auto', // Adjust the margin as needed
        backgroundImage: 'linear-gradient(to right, transparent, black, transparent)' 
      }} />

      <div className='flex flex-row items-center text-left' style={{width: '250px', marginTop: 5}}>
        <Image src={subicon} width={20} height={20} style={{width: '30px', height: '30px'}} alt='Icon'/>
        <p style={{color: '#857E94', fontWeight: 'bold', marginLeft: '20px'}}>{videosLimit}</p>
      </div>
      <div className='flex flex-row items-center text-left' style={{width: '250px', marginTop: 15}}>
        <Image src={subicon} width={20} height={20} style={{width: '30px', height: '30px'}} alt='Icon'/>
        <p style={{color: '#857E94', fontWeight: 'bold', marginLeft: '20px'}}>{mbLimit}</p>
      </div>
      <div className='flex flex-row items-center text-left' style={{width: '250px', marginTop: 15}}>
        <Image src={subicon} width={20} height={20} style={{width: '30px', height: '30px'}} alt='Icon'/>
        <p style={{color: '#857E94', fontWeight: 'bold', marginLeft: '20px'}}>{lengthLimit}</p>
      </div>
      <div className='flex flex-row items-center text-left' style={{width: '250px', marginTop: 15}}>
        <Image src={subicon} width={20} height={20} style={{width: '30px', height: '30px'}} alt='Icon'/>
        <p style={{color: '#857E94', fontWeight: 'bold', marginLeft: '20px'}}>{stylesLimit}</p>
      </div>
      {/* Uncomment and style the rest of the content as needed */}
      {/* <p style={{ margin: 'auto', textAlign: 'center', fontSize: 25, color: 'black', fontWeight: 'bold', marginTop: 20 }}>{videosLimit}</p>
      <p style={{ margin: 'auto', textAlign: 'center', fontSize: 25, color: 'black', fontWeight: 'bold', marginTop: 20 }}>{mbLimit}</p>
      <p style={{ margin: 'auto', textAlign: 'center', fontSize: 25, color: 'black', fontWeight: 'bold', marginTop: 20 }}>{lengthLimit}</p>
      <p style={{ margin: 'auto', textAlign: 'center', fontSize: 25, color: 'black', fontWeight: 'bold', marginTop: 20 }}>{stylesLimit}</p> */}

      {/* <p style={{ margin: 'auto', textAlign: 'center', fontSize: 25, color: 'black', fontWeight: 'bold', marginTop: 20 }}>{link}</p> */}

      <Button onClick={func} className=' p-4 mt-5 font-bold rounded-xl' style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', marginBottom: 20 }} color='secondary'>
        <p>Get the plan</p>
        <TiArrowRight />
      </Button>
    </div>

  )
}

export default Box;
