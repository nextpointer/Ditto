import React, { useRef } from "react";
import { CardRefs, compareArray } from "../store/states";
import { CompareMoves } from "../utils/helper";
import img from "../assets/img/pokeball/ball03.png";
import "./cardStyle.css";
interface CardProp {
  hiddenElement: string;
}

const Card = (props: CardProp) => {
  const CardRef = useRef<HTMLDivElement | null>(null);

  const Handler = (event: React.MouseEvent) => {
    if (CardRefs.value.size <= 1) {
      const siblingElement = event.currentTarget.nextElementSibling?.textContent;
      if (siblingElement) {
        compareArray.value = [...compareArray.value, siblingElement];
        // flip the cards
        if (CardRef && CardRef.current) {
          // store the CardRef globally
          CardRefs.value.add(CardRef.current);
          CardRef.current.style.transform = "rotateY(180deg)";
        }
      }

      // compare the player moves
      CompareMoves();
    }
  };

  return (
    <>
      <div className="relative h-full w-full">
        <div
          className="absolute w-full h-full transform-3d transition-all ease-in-out duration-700 rounded-xl"
          ref={CardRef}
        >
          <div
            className="absolute w-full h-full backface-hidden rounded-xl flex-center  text-4xl cursor-pointer card"
            onClick={Handler}
          >
            <img src={img} alt="pokeBall" />
          </div>
          <div className="absolute w-full h-full backface-hidden bg-black rotate-y-180 rounded-xl flex-center text-4xl">
            {props.hiddenElement}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
