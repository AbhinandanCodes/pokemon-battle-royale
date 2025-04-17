import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  resetBattle,
  setPokemons,
  startBattle,
} from "../features/battle/battleSlice";
import { BattlePokemon, TurnLog } from "../features/battle/types";
import BattleArena from "../components/BattleArena/BattleArena";
import { useBattleAnimation } from "../hooks/useBattleAnimation";
import { useNavigate } from "react-router-dom";

const BattleRoyale = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const allPokemons = useAppSelector((state) => state.pokemon.data);
  const battleLog = useAppSelector(
    (state) => state.battle.battleLog
  ) as TurnLog[];
  const originalBattlePokemons = useAppSelector(
    (state) => state.battle.pokemons
  );
  const winner = useAppSelector((state) => state.battle.winners);

  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [updatedPokemons, setUpdatedPokemons] = useState<BattlePokemon[]>([]);
  const [logReady, setLogReady] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [speedFactor, setSpeedFactor] = useState(1);
  const [paused, setPaused] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (allPokemons.length === 0) {
      navigate("/");
    } else {
      dispatch(resetBattle());
    }
  }, [allPokemons, dispatch, navigate]);

  useEffect(() => {
    if (allPokemons.length > 0) {
      dispatch(setPokemons(allPokemons));
      dispatch(startBattle());
    }
  }, [allPokemons, dispatch]);

  useEffect(() => {
    setUpdatedPokemons(originalBattlePokemons);
    setHasPlayed(false);
  }, [originalBattlePokemons]);

  useBattleAnimation(
    battleLog,
    updatedPokemons,
    setUpdatedPokemons,
    setCurrentLogIndex,
    hasPlayed,
    setHasPlayed,
    setLogReady,
    speedFactor,
    paused
  );

  const togglePause = () => setPaused((prev) => !prev);
  const toggleShowHistory = () => setShowHistory((prev) => !prev);

  const finalLog =
    winner && winner.length > 0
      ? `Winner${winner.length > 1 ? "s" : ""}: ${winner
          .map((w) => w.name)
          .join(", ")}`
      : null;

  const isFinalTurn = currentLogIndex === battleLog.length - 1;

  return (
    <div className="p-6 flex gap-6">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Battle Royale</h1>

        {/* Speed and Controls */}
        <div className="mb-6">
          <label htmlFor="speedSlider" className="block font-medium mb-2">
            ⚙️ Animation Speed:
          </label>
          <div className="flex items-center gap-3">
            <span role="img" aria-label="slow">
              ⚡
            </span>
            <input
              id="speedSlider"
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speedFactor}
              onChange={(e) => {
                setSpeedFactor(Number(e.target.value));
              }}
              className="w-32"
            />
            <span role="img" aria-label="fast">
              🐢
            </span>
            <button
              onClick={togglePause}
              className="ml-4 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {paused ? "▶️ Resume" : "⏸ Pause"}
            </button>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {speedFactor === 0.5
              ? "Fast ⚡"
              : speedFactor === 1
              ? "Normal 🚶‍♂️"
              : "Slow 🐢"}
          </div>
        </div>

        <BattleArena pokemons={updatedPokemons} />
      </div>


      <div className="w-[350px] max-h-screen overflow-y-auto p-4 bg-gray-50 rounded shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-3 text-center">Turn Log</h2>

        {logReady && (
          <div className="flex flex-col gap-2">

            {finalLog && isFinalTurn && (
              <div className="p-3 mb-2 rounded bg-green-100 border-l-4 border-green-500 font-semibold shadow">
                <p className="mb-1">{finalLog}</p>
              </div>
            )}

            {!isFinalTurn && battleLog[currentLogIndex] && (
              <div className="p-3 mb-2 rounded bg-yellow-100 border-l-4 border-yellow-500 font-semibold shadow text-sm">
                <p className="mb-1 font-medium">Current Turn: {currentLogIndex + 1}</p>
                {battleLog[currentLogIndex].actions.map((action, i) => (
                  <p key={i}>{action.message}</p>
                ))}
              </div>
            )}


            <button
              onClick={toggleShowHistory}
              className="self-start px-2 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
            >
              {showHistory ? "⬆️ Hide History" : "⬇️ Show History"}
            </button>


            {showHistory &&
              battleLog
                .slice(0, isFinalTurn ? currentLogIndex + 1 : currentLogIndex)
                .map((turn, index) => (
                  <div
                    key={index}
                    className="p-3 mb-2 rounded bg-white border-l-4 border-gray-200 text-sm"
                  >
                    <p className="mb-1 font-medium">Turn {index + 1}</p>
                    {turn.actions.map((action, i) => (
                      <p key={i}>{action.message}</p>
                    ))}
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BattleRoyale;
