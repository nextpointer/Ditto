import React, { useRef, useState } from "react";


const Card = () => {

    const [CompareElement,setCompareElement]  =useState<string[] | undefined>([])
    console.log(CompareElement);
    
    let FrontSideRef = useRef<HTMLDivElement| null>(null);
    const SomethingHappen = (event:React.MouseEvent)=>{
        const siblingElement = event.currentTarget.nextElementSibling?.textContent;
        if(siblingElement){
            setCompareElement((prev)=>{
                if(prev!.length<2){
                    return [...prev!,siblingElement]
                }
                if(prev?.length===2){
                    console.log(CompareElement![0]===CompareElement![1]);
                    
                }
            })

            
        }
        
    }
  return (
    <>
      <div className="relative h-full w-full">
        <div className="absolute w-full h-full transform-3d transition-all ease-in-out duration-900 rounded-xl">
          <div className="absolute w-full h-full backface-hidden bg-blue-500 rounded-xl flex-center text-4xl cursor-pointer" ref={FrontSideRef} onClick={SomethingHappen}>
            ⭐
          </div>
          <div className="absolute w-full h-full backface-hidden bg-pink-400 rotate-y-180 rounded-xl flex-center text-4xl">
            😪
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
