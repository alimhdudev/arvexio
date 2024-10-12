import React from 'react'
import FreeCounter from '../components/free-counter'

const Counter = async () => {
  return (
    <div style={{marginLeft: 'auto', marginRight:'auto', textAlign: 'center', marginBottom: '20px'}}>
        <p>Counter</p>
        <FreeCounter/>
    </div>
  )
}

export default Counter