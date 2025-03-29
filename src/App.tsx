import { useState } from "react";
import PlayGame from "./Components/PlayGame";


function App() {

  
  const [showType, setShowType] = useState<boolean>(false);
  const TypeOfGrid = [
    { label: "Easy", size: 4 },
    { label: "Medium", size: 6 },
    { label: "Hard", size: 8 },
  ];
  const [isStartGame, setGameStart] = useState<boolean>(false);
  const [gridSize,setGridSize] = useState<number>(4);

  return (
    <>
      <main className="h-screen w-full overflow-hidden">
        {/* Game Starting Section */}
        <div
          className={`h-screen w-full bg-gray-50 flex-center flex-col gap-4 transition-transform duration-500 ease-in-out ${
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
          <div
            className={`${
              showType ? "opacity-100" : "opacity-0"
            } flex-center flex-row gap-4`}
          >
            <center className="text-xl">Select one grid</center>
            {TypeOfGrid.map((grid) => (
              <button
                className={`flex items-center justify-center rounded-4xl bg-white text-black border border-gray-400 hover:bg-black hover:text-white p-4 cursor-pointer`}
                key={grid.label}
                disabled={!showType}
                onClick={() => {
                  setGridSize(grid.size); // Set the selected grid size
                  setGameStart(true); // Start the game
                }}
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
          <PlayGame size={gridSize}/>
        </div>
      </main>
    </>
  );
}

export default App;
