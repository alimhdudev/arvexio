import React from 'react';
import { getApiLimitCount } from '../../../prisma/api-limit';
import { checkSubscription } from '../../../libs/subscription';
import { Constants, MAX_FREE_COUNTS } from '../../../public/constants';
import { Progress } from "@nextui-org/react";
import ButtonX from '../../components/Button';
import { SubscriptionButton } from '../../components/subscription-button';
import { checkSubscriptionCheck } from '../../../libs/subscriptioncheck';
import Link from 'next/link';

import { Mbs } from '../../../public/mbs';
import { Minutes } from '../../../public/minutes';
import { Styles } from '../../../public/styles';

const page = async () => {
  const apiLimitCount =  await getApiLimitCount();
  const { isValid: isPro, currentPeriodEnd, currentPeriodStart, description } = await checkSubscriptionCheck();
  const MAX_FREE_COUNTS = await Constants();

  const MEGABYTES = await Mbs();
  const MINUTES = await Minutes();
  const STYLES = await Styles();

  return (
    <div className='max-w-xl mx-auto flex flex-col items-center justify-between'>
      <section className="text-center mt-6 sm:mt-12 mb-4 sm:mb-8">
        <h1 className='text-center mx-auto text-[#0A0015] font-bold text-xl sm:text-3xl'>Subscription</h1>
      </section>

      <div className='border-0' style={{width: '250px', height: '120px',}}>
        <div className='py-6'>
          <div className='text-center text-sm'>
          {/* <p className='font-bold text-md'>{apiLimitCount} / {MAX_FREE_COUNTS} Videos left</p> */}
            <div>
              {
                description === 1900 || description == 18000 ? (<div><p className='font-bold text-xl'>Premium</p></div>) :
                description === 4900 || description === 46800 ? (<div><p className='font-bold text-xl'>Business</p></div>) :
                description === 14900 || description === 142800 ? (<div><p className='font-bold text-xl'>Agency</p></div>) :
                (<div></div>)
              }
            </div>
            <div >
              <div className='max-w-40 mx-auto mt-5 flex flex-row items-center justify-between'>Max Mbs <p className='font-bold text-xl'>{MEGABYTES}</p></div>
              <div className='max-w-40 mx-auto mt-5 flex flex-row items-center justify-between'>Max Minutes <p className='font-bold text-xl'>{MINUTES}</p></div>
              <div className='max-w-40 mx-auto mt-5 flex flex-row items-center justify-between'>Max Styles <p className='font-bold text-xl'>{STYLES}</p></div>
            </div>
            <div  className='font-bold text-md mt-10'>{apiLimitCount} / {MAX_FREE_COUNTS} Videos</div>
            <Progress aria-label="Loading..." value={(apiLimitCount / MAX_FREE_COUNTS) * 100}  className="max-w-xs mt-2"/>
            {isPro ? (<SubscriptionButton />) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
