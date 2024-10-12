'use client'
import React from 'react'
import { getApiLimitCount } from '../../prisma/api-limit';
import Subscribe from '../components/Subscribe';

const LimitProvider = ({children, apiLimitCount, isPro, maxvid}) => {
  return (
    <div>
        {
            apiLimitCount >= maxvid ? (
              <div>
                {isPro ? 
                  (
                    <div>
                      {
                        apiLimitCount < maxvid ? (<div>{children}</div>) 
                        : (<Subscribe/>)
                      }
                    </div>
                  )
                  : (<div><Subscribe/></div>)
                  }
              </div>
            ) 
            : apiLimitCount < maxvid ? (<div>{children}</div>)
            : null
        }
    </div>
  )
}

export default LimitProvider