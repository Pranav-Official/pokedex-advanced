import { Swiper, SwiperSlide } from 'swiper/react';

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

                <div className='Pokemon-display-card-box '>
                    <div className='Pokemon-display-card bg-secondary-blue flex flex-col items-center justify-center '>
                        <Image className='w-10/12 h-10/12' src="/base-sprites-compressed/24.png" width={300} height={300} />
                    </div>
                    <div className='Pokemon-display-card bg-secondary-blue flex flex-col items-center justify-center '>
                        <Image className='w-10/12 h-10/12' src="/base-sprites-compressed/25.png" width={300} height={300} />
                    </div>
                    <div className='Pokemon-display-card bg-secondary-blue flex flex-col items-center justify-center '>
                        <Image className='w-10/12 h-10/12' src="/base-sprites-compressed/26.png" width={300} height={300} />
                    </div>

                </div>

            </div>
            <div className="name-card-container">
                xcvbn
            </div>
        </div>
    )
}

export default Screen;