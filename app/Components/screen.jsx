import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

// Import Swiper styles
import 'swiper/css';

import Image from 'next/image'

const Screen = () => {



    return (
        <div className="screen border-0 flex-1 overflow-clip flex flex-row">
            <div className="Pokemon-display-card-container relative overflow-clip border-0 flex flex-col ">
                <div className="fade-layer flex flex-col ">
                    <div className="fade flex h-full ">
                    
                    </div>
                    
                </div>

                <div className='Pokemon-display-card-box justify-center  '>
                    <div className='Pokemon-display-card bg-secondary-blue flex flex-col items-center justify-center '>
                        <Image className='pokemon-image ' src="/base-sprites-compressed/24.png" width={300} height={300} />
                    </div>
                    <div className='Pokemon-display-card bg-secondary-blue flex flex-col items-center justify-center '>
                        <Image className='pokemon-image ' src="/base-sprites-compressed/25.png" width={300} height={300} />
                    </div>
                    <div className='Pokemon-display-card bg-secondary-blue flex flex-col items-center justify-center '>
                        <Image className='pokemon-image ' src="/base-sprites-compressed/26.png" width={300} height={300} />
                    </div>
                    

                </div>

            </div>
            <div className="name-card-container flex flex-col  justify-center">
                <div className='end-card flex flex-row '>
                    <div className='basis-3/4 bg-menu-block'>

                    </div>
                    <div className='basis-1/4 bg-menu-block'>
                        
                    </div>
                </div>
                <div className='name-card-3-set flex flex-col'>
                    <div className='name-card-sub bg-menu-block font-Chakra_Petch'>
                        test
                    </div >
                    <div className='name-card-sub bg-menu-block font-Chakra_Petch'>
                        test
                    </div>
                    <div className='name-card-sub bg-menu-block font-Chakra_Petch'>
                        test
                    </div>
                    
                </div>
                <div className='name-card-main bg-menu-block font-Chakra_Petch'>
                    
                </div>
                <div className='name-card-3-set flex flex-col'>
                    <div className='name-card-sub bg-menu-block font-Chakra_Petch'>
                        test
                    </div >
                    <div className='name-card-sub bg-menu-block font-Chakra_Petch'>
                        test
                    </div>
                    <div className='name-card-sub bg-menu-block font-Chakra_Petch'>
                        test
                    </div>
                    
                </div>
                <div className='end-card flex flex-row '>
                    <div className='basis-3/4 bg-menu-block'>

                    </div>
                    <div className='basis-1/4 bg-menu-block'>
                        
                    </div>
                </div>
               

                
            </div>
        </div>
    )
}

export default Screen;