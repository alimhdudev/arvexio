'use client';
import React, {useState} from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import createServer from 'next/dist/server/next';

export default function VideosLeft() {
  // const videos = async () => {
  //   const supabase = createServerComponentClient(req.cookies);
  //   const {data, error} = await supabase.from('users').select('videos_left');
  // }

  // const [fetchError, setFetchError] = useState(null);


  // useEffect(()=> {
  //   const fetchVideos = async () => {
  //     const {data, error} = await supabase
  //       .from('users')
  //       .select('videos_left')
  //       if (error) {
  //         console.log('error', error)
  //       }
  //   }
  // })

  return (
    <div>
        <h1>My Videos</h1>
        {videos}
    </div>
  )
}