import React from 'react'
import Image from '../assets/wallpapers-base.com_high_quality_wallpaper_HD_1080_IDS_1010969.jpg'

function Banner() {
  return (
    <div className='h-[20vh] md:h-[75vh] bg-cover bg-center flex items-end' style={{backgroundImage: `url(${Image})`}}>
        <div className='text-white text-xl bg-blue-900/50 w-full text-center p-3'>Avengers</div>
    </div>
  )
}

export default Banner