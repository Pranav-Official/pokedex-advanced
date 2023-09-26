import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import pokemon_ids from '../../public/data/pokemon-ids.json';

// Import Swiper styles
import 'swiper/css';

import Image from 'next/image'

const Screen = () => {

    const [nameWindow, setNameWindow] = useState([]);
    const [spritePack, setSpritePack] = useState(['', '', '']);
    const [offset, setOffset] = useState(0);
    const [tempList, setTempList] = useState([null, null, null, pokemon_ids[0], pokemon_ids[1], pokemon_ids[2], pokemon_ids[3]]);

    const [fontSize, setFontSize] = useState('16px');
    const [fontSizeMain, setFontSizeMain] = useState('16px');  // Initial font size
    const parentRef = useRef(null);

    const updateFontSize = () => {
        if (parentRef.current) {
          const parentHeight = parentRef.current.clientHeight;
          let calculatedFontSize = `${parentHeight / 17}px`; // You can adjust the divisor as needed
          setFontSize(calculatedFontSize);
          calculatedFontSize = `${parentHeight / 14}px`;
          setFontSizeMain(calculatedFontSize);

        }
      };

    // console.log(pokemon_ids[0]);

    const assignTempList = (offset) => {
        let list = [offset-3,offset-2,offset-1,offset, offset+1, offset+2, offset+3];

        let temp = [];
        for(let i = 0; i < 7; i++){
            if(list[i]>-1){
                temp.push(pokemon_ids[list[i]]);
            }
            else{
                temp.push(null);
            }
        }
        setTempList(temp);
        
    }

    const assignStrings = (list) => {
        let tempWindow = [];
        let tempSprite = ['', '', ''];
        console.log(list)

        for (let i = 0; i < 7; i++) {
            if(list[i] !== null){

                let temp = '#' + list[i].id.toString() + ' ' + list[i].name.toString().toUpperCase();

                if(i>1&&i<5){
                    tempSprite[i-2] = '/base-sprites-compressed/' + list[i].id.toString()+ '.png'
                }

                tempWindow.push(temp);
            }
            else{
                tempWindow.push('');
                if(i>1&&i<5){
                    tempSprite[i-2] = '/base-sprites-compressed/null.png'
                }
            }
        }
        setNameWindow(tempWindow);
        setSpritePack(tempSprite);
        
    }

    // console.log(tempList);

    let tempWindow = [];
    let tempSprite = ['', '', ''];

    const incrementList = () => {
        if(offset < 1263)  
        setOffset((prevOffset) => {
          const newOffset = prevOffset + 1;
          assignTempList(newOffset); // Update tempList based on the newOffset
          assignStrings(tempList);   // Update nameWindow based on the updated tempList
          return newOffset;
        });
      }

    
    const decrementList = () => {
        if (offset > 0) {
          setOffset((prevOffset) => {
            const newOffset = prevOffset - 1;
            assignTempList(newOffset); // Update tempList based on the newOffset
            assignStrings(tempList);   // Update nameWindow based on the updated tempList
            return newOffset;
          });
        }
      }


    useEffect(() => {
        updateFontSize();
        window.addEventListener('resize', updateFontSize);
        
        assignTempList(offset);
        assignStrings(tempList);

        // for (let i = 0; i < 7; i++) {
        //     if(tempList[i] !== null){

        //         let temp = '#' + tempList[i].id.toString() + ' ' + tempList[i].name.toString().toUpperCase();

        //         if(i>1&&i<5){
        //             tempSprite[i-2] = '/base-sprites-compressed/' + tempList[i].id.toString()+ '.png'
        //         }

        //         tempWindow.push(temp);
        //     }
        //     else{
        //         tempWindow.push('');
        //         if(i>1&&i<5){
        //             tempSprite[i-2] = '/base-sprites-compressed/null.png'
        //         }
        //     }
        // }
        // setNameWindow(tempWindow);
        // setSpritePack(tempSprite);

        return () => {
            window.removeEventListener('resize', updateFontSize);
          };

    }, [offset]);


    // const incrementList = () => {
    //     setOffset(offset+1);
    //     assignTempList(offset+1);
    //     assignStrings(tempList);
    //     console.log(offset)
    // }

    // const decrementList = () => {
    //     if(offset>-1){
    //         setOffset(offset-1);
    //         assignTempList(offset-1);
    //         assignStrings(tempList);
    //     }
    //     console.log(offset)
    // }

    

    



    return (
        <div className="screen border-0 flex-1 overflow-clip flex flex-row">
            <div className="Pokemon-display-card-container relative overflow-clip border-0 flex flex-col ">
                <div className="fade-layer flex flex-col ">
                    <div className="fade flex h-full ">
                    
                    </div>
                    
                </div>

                <div className='Pokemon-display-card-box justify-center  '>
                    <div className='Pokemon-display-card bg-secondary-blue flex flex-col items-center justify-center '>
                        <Image className='pokemon-image ' src={spritePack[0]}width={300} height={300} />
                    </div>
                    <div className='Pokemon-display-card bg-secondary-blue flex flex-col items-center justify-center '>
                        <Image className='pokemon-image ' src={spritePack[1]} width={300} height={300} />
                    </div>
                    <div className='Pokemon-display-card bg-secondary-blue flex flex-col items-center justify-center '>
                        <Image className='pokemon-image ' src={spritePack[2]} width={300} height={300} />
                    </div>
                    

                </div>

            </div>
            <div className="name-card-container flex flex-col  justify-center">
                <div className='end-card flex flex-row '>
                        <button className='basis-3/4 bg-menu-block' onClick={decrementList}>
                            <Image className='arrow-up ' src="/icons/arrowup.svg" width={300} height={300} />
                        </button>
                        <button className='basis-1/4 bg-menu-block'>

                        </button>
                </div>
                <div className='name-card-3-set flex flex-col' ref={parentRef} >
                    <div className='name-card-sub bg-menu-block font-Chakra_Petch whitespace-nowrap' style={{fontSize: fontSize}}>
                        {nameWindow[0]}
                    </div >
                    <div className='name-card-sub bg-menu-block font-Chakra_Petch whitespace-nowrap' style={{fontSize: fontSize}}>
                        {nameWindow[1]}
                    </div>
                    <div className='name-card-sub bg-menu-block font-Chakra_Petch whitespace-nowrap' style={{fontSize: fontSize}}>
                        {nameWindow[2]}                        
                    </div>
                    
                    <div className='name-card-main bg-menu-block font-Chakra_Petch whitespace-nowrap' style={{fontSize: fontSizeMain}}>
                        {nameWindow[3]}
                    </div>

                    <div className='name-card-sub bg-menu-block font-Chakra_Petch whitespace-nowrap' style={{fontSize: fontSize}} >
                        {nameWindow[4]}
                    </div >
                    <div className='name-card-sub bg-menu-block font-Chakra_Petch whitespace-nowrap' style={{fontSize: fontSize}}>
                        {nameWindow[5]}
                    </div>
                    <div className='name-card-sub bg-menu-block font-Chakra_Petch whitespace-nowrap' style={{fontSize: fontSize}}>
                        {nameWindow[6]}
                    </div>
                    
                </div>
                <div className='end-card flex flex-row '>
                    <button className='basis-3/4 bg-menu-block' onClick={incrementList}>
                        <Image className='arrow-up rotate-180' src="/icons/arrowup.svg" width={300} height={300} />
                    </button>
                    <button className='basis-1/4 bg-menu-block'>

                    </button>
                </div>
               

                
            </div>
        </div>
    )
}

export default Screen;