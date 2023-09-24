'use client';
import { IMAGES_MANIFEST } from 'next/dist/shared/lib/constants'
import Image from 'next/image'
import { useOrientation } from 'react-use'
import { useEffect, useState } from 'react';

export default function Home() {

  const [orientation, setOrientation] = useState(window.matchMedia("(orientation: portrait)").matches ? 'portrait' : 'landscape');

  window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
    setOrientation(e.matches ? 'portrait' : 'landscape');
  })



  return (
    <main className={`h-screen w-screen flex ${orientation === 'portrait' ? 'flex-col' : 'flex-row'}`}>
      <div className='flex flex-col'>
        <div className= {` ml-16 h-full flex flex-col items-center justify-center ${orientation === 'portrait' ? 'rotate-90 ml-0 mt-8' : ' '} `}>
          <Image src="/logo.png" width={160} height={140} />
          <p className='text-2xl font-Just_Me_Again_Down_Here '>Advanced Edition</p>
          <button className='flex flex-row font-Just_Me_Again_Down_Here mt-6 w-20 border-2 py-2 px-2 rounded-md bg-pkemon-yellow border-pkemon-blue'>
            github
            <Image className='ml-2' src="/github.png" width={20} height={20} />
        
          </button>
          <p className='text-md font-Just_Me_Again_Down_Here' >Made by Pranav P Prasanth</p>
        </div>
      </div>
      <div className={`flex flex-row ${orientation === 'portrait' ? 'rotate-90 ' : 'items-center'} `}>
        <div className=' flex flex-row  bg-pokedex bg-no-repeat bg-contain bg-center bg-menu-block'>
          <div className='border-2  ml-4 mt-32 mb-36 w-28 '>
            box
          </div>
          <div className='border-2 w-72 ml-20 translate-x-1 mt-9 mb-14 '>
            screen
          </div>
          <div className='border-2 ml-12 w-20 mt-14 mb-40 '>
            box
          </div>
        </div>
      </div>
    </main>
  )
}
 