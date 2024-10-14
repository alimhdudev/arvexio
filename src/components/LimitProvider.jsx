'use client'
import React from 'react'
import { getApiLimitCount } from '../../prisma/api-limit';
import Subscribe from '../components/Subscribe';

const LimitProvider = ({children, apiLimitCount, isPro, maxvid}) => {
  return (
    <div className=' w-full h-full'>
        {
            apiLimitCount >= maxvid ? (
              <div className=' w-full h-full'>
                {isPro ? 
                  (
                    <div className=' w-full h-full'>
                      {
                        apiLimitCount < maxvid ? (<div>{children}</div>) 
                        : (<Subscribe/>)
                      }
                    </div>
                  )
                  : (<div className=' w-full h-full'><Subscribe/></div>)
                  }
              </div>
            ) 
            : apiLimitCount < maxvid ? (<div className=' w-full h-full'>{children}</div>)
            : null
        }
    </div>
  )
}

export default LimitProvider