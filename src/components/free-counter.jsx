import React from 'react'
import { getApiLimitCount } from '../../prisma/api-limit'
import { useState, useEffect } from 'react';
import axios from 'axios';

const FreeCounter = () => {
  const [mounted, setMounted] = useState(false);

  if (!mounted) {
    return null
  }

  return (
    <div style={{marginLeft: 'auto', marginRight:'auto', textAlign: 'center', marginBottom: '20px'}}>
      FreeCounter
    </div>
  )
}

export default FreeCounter