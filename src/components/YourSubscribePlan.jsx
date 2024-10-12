import React from 'react';
import Box from './Box';
import {Switch} from "@nextui-org/react";
import {Chip} from "@nextui-org/react";
import { motion } from "framer-motion"
import axios from 'axios';
import {
  AgencyIcon,
  BusinessIcon,
  PremiumIcon,
  CheckIcon,
} from '../app/index'


const Subscribe = () => {
  const [isSelected, setIsSelected] = React.useState(true);

  const onSubscribePremiumMonthly = async () => {
    try{
      console.log('resetted api limit 1');
      const response = axios.get('/api/stripe-premium')
      window.location.href = (await response).data.url;
    } catch (error) {
      console.log(error, "STRIPE CLIENT ERROR");
    } finally {
      await fetch('/api/reset-limit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      });
    }
  }

  const onSubscribeBusinessMonthly = async () => {
    try{
      const response = axios.get('/api/stripe-business')

      window.location.href = (await response).data.url;
    } catch (error) {
      console.log(error, "STRIPE CLIENT ERROR");
    } finally {
      await fetch('/api/reset-limit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      });
    }
  }

  const onSubscribeAgencyMonthly = async () => {
    try{
      const response = axios.get('/api/stripe-agency')

      window.location.href = (await response).data.url;
    } catch (error) {
      console.log(error, "STRIPE CLIENT ERROR");
    } finally {
      await fetch('/api/reset-limit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      });
    }
  }

  

  const onSubscribePremiumAnnual = async () => {
    try{
      const response = axios.get('/api/stripe-premium-annual')

      window.location.href = (await response).data.url;
    } catch (error) {
      console.log(error, "STRIPE CLIENT ERROR");
    } finally {
      await fetch('/api/reset-limit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      });
    }
  }

  const onSubscribeBusinessAnnual = async () => {
    try{
      const response = axios.get('/api/stripe-business-annual')

      window.location.href = (await response).data.url;
    } catch (error) {
      console.log(error, "STRIPE CLIENT ERROR");
    } finally {
      await fetch('/api/reset-limit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      });
    }
  }

  const onSubscribeAgencyAnnual = async () => {
    try{
      const response = axios.get('/api/stripe-agency-annual')

      window.location.href = (await response).data.url;
    } catch (error) {
      console.log(error, "STRIPE CLIENT ERROR");
    } finally {
      await fetch('/api/reset-limit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      });
    }
  }

  return (
    <div>
      <section className="text-center mt-5 mb-4 sm:mb-8">
        <h1 className='text-center mx-auto text-[#0A0015] font-bold text-xl sm:text-3xl'>Get Started</h1>
      </section>

      <div className='w-fit mx-auto flex flex-row items-center gap-x-2' style={{marginBottom: '20px'}}>
        <p>Monthly</p>
        <Switch color='secondary' isSelected={isSelected} onValueChange={setIsSelected}></Switch>

        <p style={{ marginLeft: '-9px' }}>Yearly</p>
        <Chip color="secondary" variant="flat" radius="md">Save 25%</Chip>
      </div>

      {isSelected ? (
        <motion.div 
          className='flex flex-row max-w-5xl mx-auto'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Box 
            name="Premium"
            price="$15"
            icon={PremiumIcon} // Pass the imported SVG as a prop
            subicon={CheckIcon}
            func={onSubscribePremiumAnnual}
            videosLimit="300 videos"
            mbLimit="250mb / video"
            lengthLimit="2 minutes max"
            stylesLimit="20 styles"
            link="https://example.com/basic-plan"
          />
          <Box 
            name="Business"
            price="$39"
            icon={BusinessIcon}
            subicon={CheckIcon}
            func={onSubscribeBusinessAnnual}
            videosLimit="1440 videos"
            mbLimit="450mb / video"
            lengthLimit="3 minutes max"
            stylesLimit="40 styles"
            link="https://example.com/standard-plan"
          />
          <Box 
            name="Agency"
            price="$119"
            icon={AgencyIcon}
            subicon={CheckIcon}
            func={onSubscribeAgencyAnnual}
            videosLimit="3000 videos"
            mbLimit="650mb / video"
            lengthLimit="5 minutes max"
            stylesLimit="50 styles"
            link="https://example.com/premium-plan"
          />
        </motion.div>
      ) : (
        <motion.div 
          className='flex flex-row max-w-5xl mx-auto '
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Box 
            name="Premium"
            price="$19"
            icon={PremiumIcon} // Pass the imported SVG as a prop
            subicon={CheckIcon}
            func={onSubscribePremiumMonthly}
            videosLimit="25 videos / month"
            mbLimit="250mb / video"
            lengthLimit="2 minutes max"
            stylesLimit="20 styles"
            link="https://example.com/basic-plan"
          />
          <Box 
            name="Business"
            price="$49"
            icon={BusinessIcon}
            subicon={CheckIcon}
            func={onSubscribeBusinessMonthly}
            videosLimit="120 videos / month"
            mbLimit="450mb / video"
            lengthLimit="3 minutes max"
            stylesLimit="40 styles"
            link="https://example.com/standard-plan"
          />
          <Box 
            name="Agency"
            price="$149"
            icon={AgencyIcon}
            subicon={CheckIcon}
            func={onSubscribeAgencyMonthly}
            videosLimit="300 videos / month"
            mbLimit="650mb / video"
            lengthLimit="5 minutes max"
            stylesLimit="50 styles"
            link="https://example.com/premium-plan"
          />
        </motion.div>
      )
    }
    </div>
  );
}

export default Subscribe;
