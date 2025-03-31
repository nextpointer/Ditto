import { useState } from "react";
import PlayGame from "./Components/PlayGame";
import { emojiArray16, emojiArray32, emojiArray64 } from "./assets/elements";
import { arrayRandomize } from "./utils/helper";
import { gridSize } from "./store/states";

function App() {
  const [showType, setShowType] = useState<boolean>(false);
  const [isStartGame, setGameStart] = useState<boolean>(false);
  const [randomizeArray, setRandomizeArray] = useState<string[]>([]);
  const TypeOfGrid = [
    { label: "Easy", size: 4 },
    { label: "Medium", size: 6 },
    { label: "Hard", size: 8 },
  ];
  // mapping with array should be picked
  const arrayPicking: Record<number, string[]> = {
    4: emojiArray16,
    6: emojiArray32,
    8: emojiArray64,
  };

  const GameModeHandler = (grid_size: number) => {
    gridSize.value = grid_size; // Set the selected grid size
    setGameStart(true); // Start the game
    const selectedEmojiArray = arrayPicking[gridSize.value];
    const randomized = arrayRandomize([...selectedEmojiArray]);
    setRandomizeArray(randomized);
  };

  return (
    <>
      <main className="h-screen w-full overflow-hidden">
        {/* Game Starting Section */}
        <div
          className={`h-screen w-full flex-center flex-col gap-4 transition-transform duration-500 ease-in-out ${
            isStartGame ? "-translate-y-full" : "translate-y-0"
          }`}
        >
          <h1 className="text-4xl text-red">Welcome to Ditto</h1>
          <button
            onClick={() => {
              setShowType(true);
            }}
            disabled={showType ? true : false}
            className="disabled:opacity-20"
          >
            Start Game
          </button>
          <div className={`${showType ? "opacity-100" : "opacity-0"} flex-center flex-row gap-4`}>
            <center className="text-xl">Select one mode</center>
            {TypeOfGrid.map((grid) => (
              <button
                className={`flex items-center justify-center rounded-4xl bg-white text-black border border-gray-400 hover:bg-black hover:text-white p-4 cursor-pointer`}
                key={grid.label}
                disabled={!showType}
                onClick={() => GameModeHandler(grid.size)}
              >
                {grid.label}
              </button>
            ))}
          </div>
        </div>
        {/* Game Playing Section */}
        <div
          className={`h-screen w-full transition-transform duration-500 ease-in-out ${
            isStartGame ? "-translate-y-full" : "translate-y-0"
          } flex justify-end items-center flex-col gap-3`}
        >
          <PlayGame size={gridSize.value} randomizeArray={randomizeArray} />
        </div>
      </main>
    </>
  );
}

export default App;
