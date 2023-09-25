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
                <Swiper spaceBetween={50}
                        slidesPerView={3}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        >
                            <SwiperSlide>Slide 1</SwiperSlide>
                            <SwiperSlide>Slide 1</SwiperSlide>
                    ...
                </Swiper>
                </div>

            </div>
            <div className="name-card-container">
                xcvbn
            </div>
        </div>
    )
}

export default Screen;