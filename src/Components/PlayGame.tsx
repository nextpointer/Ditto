import {
  counter,
  player1Move,
  Player1Point,
  Player2Point,
} from "../store/states";
import Card from "./Card";
import { useSignals } from "@preact/signals-react/runtime";
interface PropType {
  size: number;
  randomizeArray: string[];
}

const PlayGame = (props: PropType) => {
  useSignals();
  const gridSize = props.size;
  const cells = Array.from({ length: gridSize * gridSize });
  // Define an object to map grid sizes to Tailwind CSS classes
  const gridClasses: Record<number, string> = {
    4: "grid-cols-4 grid-rows-4",
    6: "grid-cols-6 grid-rows-6",
    8: "grid-cols-8 grid-rows-8",
  };

  if (counter.value === gridSize * gridSize) {
    return (
      <div className="h-screen w-full flex-center absolute left-0 top-0">
        <div className=" border border-black rounded-3xl flex flex-col gap-4 p-16 text-3xl">
          {Player1Point.value > Player2Point.value
            ? "Player 1 wins"
            : Player1Point.value < Player2Point.value
            ? "Player 2 wins"
            : "It's a draw"}
          <button onClick={() => window.location.reload()}>Rematch</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full p-2">
        <div
          className={`bg-red-400 w-full flex-center h-full text-2xl p-2 ${
            player1Move.value ? "border-2 border-double border-black" : ""
          }`}
        >
          <span>P1 - {Player1Point.value}</span>
        </div>
        <h2 className="text-xl text-center w-full flex-center">
          {player1Move.value ? "Player 1's turn" : "Player 2's turn"}
        </h2>
        <div
          className={`bg-green-400 w-full flex-center h-full text-2xl p-2 ${
            !player1Move.value ? "border-2 border-double border-black" : ""
          }`}
        >
          <span>P2 - {Player2Point.value}</span>
        </div>
      </div>
      <div
        className={`h-[90vh] w-full grid ${gridClasses[gridSize]} gap-2 place-items-center p-4`}
      >
        {cells.map((_, key) => (
          <div key={key} className=" h-full w-full flex-center">
            <Card hiddenElement={props.randomizeArray[key]} />
          </div>
        ))}
      </div>
    </>
  );
};

export default PlayGame;
