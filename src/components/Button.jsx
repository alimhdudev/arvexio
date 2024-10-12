'use client'
import React from 'react'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'
import Link from "next/link";

const ButtonX = ({children}) => {
  const router = useRouter()
  return (
    <Link href="/" className="max-auto">
      <Button className='w-full text-white mt-5 font-bold text-md' style={{backgroundColor: '#9730FF'}}>{children}</Button>
    </Link>
  )
}

export default ButtonX