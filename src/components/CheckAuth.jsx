'use client'
import React from 'react'
import UploadForm from './UploadForm';

const CheckAuth = () => {
  // let [isLimited, setIsLimited ] = useState('');
  // const checkLimit = async () => {
  //   const response = await fetch('/api/checklimit', {
  //     method: 'POST',
  //     headers: {'Content-Type': 'application/json'}
  //   });
  //   if (response.status === 403) {
  //     setIsLimited('limited')
  //   }
  // }
  // useEffect(()=>{
  //   checkLimit();
  // },[])

  return (
    <div>
      <UploadForm/>
    </div>
  )
}

export default CheckAuth