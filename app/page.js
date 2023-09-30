'use client';
import { IMAGES_MANIFEST } from 'next/dist/shared/lib/constants'
import Image from 'next/image'
import { useOrientation } from 'react-use'
import { useEffect, useState } from 'react';
import Screen from './Components/screen';
import { motion } from 'framer-motion';

export default function Home() {

  const [orientation, setOrientation] = useState('landscape');

  // window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
  //   setOrientation(e.matches ? 'portrait' : 'landscape');
  // })

  useEffect(() => {
    setOrientation(window.matchMedia("(orientation: portrait)").matches ? 'portrait' : 'landscape')

    window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
      setOrientation(e.matches ? 'portrait' : 'landscape');
    })
    

  }, [orientation])



  return (
    <main className={` flex overflow-fit items-center justify-center h-screen `}>
      <div className={`fixed top-0 right-0 my-auto px-5 w-screen h-screen border-2 flex flex-col z-10 text-center justify-center text-4xl font-Just_Me_Again_Down_Here rounded-xl shadow-xl bg-pkemon-yellow ${orientation === 'portrait' ? '' : 'hidden'}`}>
        <p>This websites works best in landscape mode. <span className='text-5xl'> please rotate your device!!</span> </p>
      </div>
      <div className={`  flex w-full h-full lg:flex-col items-center ${orientation === 'portrait' ? 'hidden' : 'flex-row '}`}>
        <div className= {`ml-10 -mr-6 basis-1/4 h-full w-full flex flex-col items-center justify-center lg:my-10 lg:ml-0 lg:-mr-0 `}>
          <Image className='w-44 xl:w-56 2xl:w-72' src="/logo.png" width={300} height={300} />
          <p className='text-2xl lg:text-3xl 2xl:text-4xl font-Just_Me_Again_Down_Here '>Advanced Edition</p>
          <p className='text-xl lg:text-2xl 2xl:text-3xl font-Just_Me_Again_Down_Here '>Made by Pranav</p>
          <button className='items-center flex flex-row font-Just_Me_Again_Down_Here mt-6 w-20 border-2 py-2 px-2 rounded-md bg-pkemon-yellow border-pkemon-blue text-xl lg:absolute lg:right-14 lg:top-14  xl:px-4 lg:text-4xl lg:w-fit'>
            github
            <Image className='ml-2 w-5 h-5 lg:w-auto lg:h-auto' src="/github.png" width={20} height={20} />
        
          </button>
        </div>
        <div className= {`basis-3/4 flex flex-col justify-center lg:w-3/4 xl:w-3/5 2xl:w-1/2 `}>
          <div className='bg-pokedex bg-no-repeat bg-center bg-contain aspect-video flex flex-row items-center justify-ar'>
            <div className='dpad-container grid grid-cols-2 rotate-45 border-0 '>
                <div className='center-circle absolute bg-primary-blue'>

                </div>
                <button className='dpad-buttons bg-dpad-grey flex items-center justify-center'>
                    
                </button>
                <button className='dpad-buttons bg-dpad-grey'>

                </button>
                <button className='dpad-buttons bg-dpad-grey'>

                </button>
                <button className='dpad-buttons bg-dpad-grey'>

                </button>
            </div>
            <div className='screen-container border-0 flex'>
              <Screen/>
            </div>
            <div className='button-container border-0 rotate-0'>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='absolute  side-buttons-1 '>
                <Image src="/icons/volume-low-solid.svg" width={20} height={20} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='absolute side-buttons-2 '>
                <Image src="/icons/a-solid.svg" width={50} height={50} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='absolute side-buttons-3 '>
                <Image src="/icons/b-solid.svg" width={50} height={50} />

              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
 