
import React from 'react'
import { Mbs } from '../../public/mbs'
import { Minutes } from '../../public/minutes'
import UploadProvider from '../components/UploadProvider'

const AiCaptions = async () => {
    const MEGABYTES = await Mbs();
    const MINUTES = await Minutes();
  return (
    <div><UploadProvider MEGABYTES={MEGABYTES} MINUTES={MINUTES}/></div>
  )
}

export default  AiCaptions;