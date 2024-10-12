'use client'
import { useEffect } from "react"
import { Crisp } from 'crisp-sdk-web'

export const CrispChat = () => {
    useEffect(()=>{
        Crisp.configure("961e8058-8b1f-415f-9f5d-543bfa070b77")
    },[])

    return null;

    
}