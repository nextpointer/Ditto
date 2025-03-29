import { emojiArray16, emojiArray32, emojiArray64 } from "../assets/elements";
import { arrayRandomize } from "../utils/helper";
import Card from "./Card";
interface PropType {
  size: number;
}

const PlayGame = (props: PropType) => {
  const gridSize = props.size;
  const cells = Array.from({ length: gridSize * gridSize });
  // Define an object to map grid sizes to Tailwind CSS classes
  const gridClasses: Record<number, string> = {
    4: "grid-cols-4 grid-rows-4",
    6: "grid-cols-6 grid-rows-6",
    8: "grid-cols-8 grid-rows-8",
  };
  // mapping with array should be picked
  const arrayPicking: Record<number, string[]> = {
    4: emojiArray16,
    6: emojiArray32,
    8: emojiArray64,
  };

  const selectedEmojiArray = arrayPicking[gridSize];
  const randomizeArray = arrayRandomize([...selectedEmojiArray]);

  return (
    <>
      <h1>Player Logic</h1>
      <div
        className={`h-[90vh] w-full grid ${gridClasses[gridSize]} gap-2 place-items-center p-4`}
      >
        {cells.map((_, key) => (
          <div key={key} className=" h-full w-full flex-center">
            <Card hiddenElement={randomizeArray[key]} />
          </div>
        ))}
      </div>
    </>
  );
};

export default PlayGame;
