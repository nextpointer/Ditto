import { counter, player1Move, Player1Point, Player2Point } from "../store/states";
import Card from "./Card";
import "./playGameStyle.css";
import { useSignals } from "@preact/signals-react/runtime";

// img import
import ball from "../assets/img/pokeball/Pokeball.png";

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
    // 4: "grid-cols-4 grid-rows-4",
    // 6: "grid-cols-6 grid-rows-6",
    // 8: "grid-cols-8 grid-rows-8",
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
      <div className="flex flex-row justify-between items-center w-full game-header">
        <div
          className={`left-box player w-full flex-center h-full text-2xl p-2 ${
            player1Move.value ? "active" : ""
          }`}
        >
          <p className="font-bold">Player 1</p>
          <p className="text-sm">
            Score -<span> {Player2Point.value}</span>
          </p>
        </div>
        <div className="score-turn flex justify-between items-center ">
          <img src={ball} alt="poke" className={player1Move.value ? "active-player" : ""} />
          <h2 className="text-xl text-center w-full flex-center">
            {player1Move.value ? "Player 1's turn" : "Player 2's turn"}
          </h2>
          <img src={ball} alt="poke" className={!player1Move.value ? "active-player" : ""} />
        </div>
        <div
          className={` right-box player w-full flex-center h-full text-2xl p-2 ${
            !player1Move.value && "active"
          }`}
        >
          <p className="font-bold">Player 2</p>
          <p className="text-sm">
            Score -<span> {Player2Point.value}</span>
          </p>
        </div>
      </div>
      <div
        className={`${gridSize === 4 ? "h-[90vh]" : "h-screen"} w-[80%] grid ${
          gridClasses[gridSize]
        } gap-2 place-items-center p-4`}
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
