import { Loader } from 'lucide-react'
import React, { useEffect } from 'react'
import { Aic } from '../../assets/logos/logs'

const LoaderAic = () => {

    useEffect(()=>{
        
    })

  return (
    <div className=' fixed w-full h-full bg-[#d3dff3] z-50 top-0 justify-center flex items-center '>
        <div className=' flex flex-col justify-center items-center '>
            <img src={Aic} alt="" className='w-[120px]' />
           <div style={{
            rotate:"150deg"
           }}>
            <Loader/>
           </div>
        </div>
    </div>
  )
}

export default LoaderAic