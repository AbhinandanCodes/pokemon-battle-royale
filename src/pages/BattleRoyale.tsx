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
import WinnerAnnouncement from "../components/WinnerAnnouncement/WinnerAnnouncement";
import InfoToolTip from "../components/InfoToolTip/InfoToolTip";
import AliveProgressBar from "../components/AliveProgressBar/AliveProgressBar";
import AnimationSpeedSlider from "../components/AnimationSpeedSlider/AnimationSpeedSlider";
import PauseButton from "../components/PauseButton/PauseButton";

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
      ? `Winner${winner.length > 1 ? "s" : ""}:`
      : null;

  const isFinalTurn = currentLogIndex === battleLog.length - 1;

  return (
    <div className="p-6 flex gap-6 bg-emerald-100 bg-[url('/emerald-bg.png')] bg-cover bg-center font-pixel">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4 text-emerald-900 drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
          Battle Royale
        </h1>

        <div className="mb-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <AnimationSpeedSlider
                speedFactor={speedFactor}
                setSpeedFactor={setSpeedFactor}
              />
              <PauseButton paused={paused} togglePause={togglePause} />
            </div>

            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold rounded-lg border-4 border-emerald-900 shadow-[3px_3px_0_rgba(0,0,0,0.3)] transition"
            >
              🏠 Back to Home
            </button>

            <AliveProgressBar
              aliveCount={updatedPokemons.filter((p) => p.currentHp > 0).length}
              totalCount={updatedPokemons.length}
            />
          </div>
        </div>

        <BattleArena pokemons={updatedPokemons} />
      </div>

      <div className="w-[350px] max-h-screen overflow-y-auto p-4 bg-emerald-200 rounded-xl shadow-lg border-4 border-emerald-700">
        <h2 className="text-2xl font-semibold mb-4 text-center text-emerald-900 border-b-2 border-emerald-600 pb-2">
          Turn Log
        </h2>

        {logReady && (
          <div className="flex flex-col gap-2">
            {finalLog && isFinalTurn && (
              <div className="relative p-6 mb-2 rounded bg-green-100 border-l-4 border-green-500 font-semibold shadow-xl flex items-center justify-between">
                <WinnerAnnouncement winnerNames={winner.map((w) => w.name)} />
                <InfoToolTip
                  direction="left"
                  message={
                    <>
                      <p className="font-semibold">The match also ends when:</p>
                      <ul className="mt-1 space-y-1">
                        <li>
                          - All remaining Pokémon are immune to each other
                        </li>
                        <li>- All moves run out of Power Points (PP)</li>
                      </ul>
                    </>
                  }
                />
              </div>
            )}

            {!isFinalTurn && battleLog[currentLogIndex] && (
              <div className="p-3 mb-2 rounded bg-yellow-100 border-l-4 border-yellow-500 font-semibold shadow text-sm">
                <p className="mb-1 font-medium">
                  Current Turn: {currentLogIndex + 1}
                </p>
                {battleLog[currentLogIndex].actions.map((action, i) => (
                  <p key={i}>{action.message}</p>
                ))}
              </div>
            )}

            <button
              onClick={toggleShowHistory}
              className="self-start px-4 py-2 text-sm rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition"
            >
              {showHistory ? "⬆️ Hide History" : "⬇️ Show History"}
            </button>

            {showHistory &&
              battleLog
                .slice(0, isFinalTurn ? currentLogIndex + 1 : currentLogIndex)
                .map((turn, index) => (
                  <div
                    key={index}
                    className="p-3 mb-2 rounded bg-white border-l-4 border-gray-300 text-sm"
                  >
                    <p className="mb-1 font-medium text-emerald-900">
                      Turn {index + 1}
                    </p>
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
