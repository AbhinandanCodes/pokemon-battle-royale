import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  resetBattle,
  setPokemons,
  startBattle,
} from "../features/battle/battleSlice";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import HealthBar from "../components/HealthBar/HealthBar";
import { BattlePokemon, TurnLog } from "../features/battle/types";
// import { getCachedPokemon } from "../utils/cache";

const BattleRoyale = () => {
  const dispatch = useAppDispatch();
  const allPokemons = useAppSelector((state) => state.pokemon.data);
  const battleLog = useAppSelector(
    (state) => state.battle.battleLog
  ) as TurnLog[];
  const originalBattlePokemons = useAppSelector(
    (state) => state.battle.pokemons
  );

  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [updatedPokemons, setUpdatedPokemons] = useState<BattlePokemon[]>([]);
  const [updatedPokemons1, setUpdatedPokemons1] =
    useState<BattlePokemon[]>(updatedPokemons);

  const [logReady, setLogReady] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset battle on first render
  useEffect(() => {
    dispatch(resetBattle());
  }, [dispatch]);

  useEffect(() => {
    const currentLog = battleLog[currentLogIndex];
    if (currentLog) {
      // currentLog.actions.forEach(async (action) => {

      // });

      const animateActions = async () => {
        for (let i = 0; i < currentLog.actions.length; i++) {
          const action = currentLog.actions[i];
          const attacker = document.getElementById(String(action.attackerId));
          const defender = document.getElementById(String(action.defenderId));
          if (attacker && defender) {
            const attackerRect = attacker.getBoundingClientRect();
            const defenderRect = defender.getBoundingClientRect();
            const attackerX = attackerRect.x + attackerRect.width / 2;
            const attackerY = attackerRect.y + attackerRect.height / 2;
            const defenderX = defenderRect.x + defenderRect.width / 2;
            const defenderY = defenderRect.y + defenderRect.height / 2;
            const distanceX = defenderX - attackerX;
            const distanceY = defenderY - attackerY;

            attacker.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
            attacker.style.transition = "transform 0.2s ease-in-out";

            defender.style.transform = "translate(10px)";
            setTimeout(() => {
              defender.style.transform = "translate(0)";
            }, 50);
            setTimeout(() => {
              attacker.style.transform = "translateY(0)";
            }, 100);
          }
          setUpdatedPokemons1(updatedPokemons);
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      };

      animateActions();
      // console.log(getCachedPokemon(currentLog.actions[0].attackerId));
      // console.log(currentLog.actions);
      // console.log(`Turn ${current}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battleLog, currentLogIndex]);

  // After Pokémon data is available, set and start battle
  useEffect(() => {
    if (allPokemons.length > 0) {
      dispatch(setPokemons(allPokemons));
      dispatch(startBattle());
    }
  }, [allPokemons, dispatch]);

  // Initialize updatedPokemons when originalPokemons change
  useEffect(() => {
    setUpdatedPokemons(originalBattlePokemons);
  }, [originalBattlePokemons]);

  // Process battleLog turn by turn
  useEffect(() => {
    if (battleLog.length > 0 && updatedPokemons.length > 0) {
      let i = 0;

      intervalRef.current = setInterval(() => {
        const turn = battleLog[i];
        if (!turn) {
          clearInterval(intervalRef.current!);
          return;
        }

        // Apply damage/fainting effects
        setUpdatedPokemons((prev) => {
          const updated = [...prev];
          turn.actions.forEach((action) => {
            if (
              action.defenderId !== undefined &&
              action.defenderCurrentHp !== undefined
            ) {
              const idx = updated.findIndex((p) => p.id === action.defenderId);
              if (idx !== -1) {
                updated[idx] = {
                  ...updated[idx],
                  currentHp: Math.max(action.defenderCurrentHp, 0),
                };
              }
            }
          });
          return updated;
        });

        setCurrentLogIndex(i);
        i++;

        if (i >= battleLog.length) {
          clearInterval(intervalRef.current!);
        }
      }, 2000);

      setLogReady(true);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [battleLog, updatedPokemons.length]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Battle Royale</h1>

      {/* Cards + HP bars */}
      <div className="flex flex-wrap gap-6 justify-center">
        {updatedPokemons1.map((pokemon) => (
          <div
            key={pokemon.id}
            id={String(pokemon.id)}
            className="flex flex-col items-center w-[300px]"
          >
            <HealthBar
              currentHp={pokemon.currentHp}
              maxHp={pokemon.maxHp}
              name={pokemon.name}
            />
            <div
              className={`${
                pokemon.currentHp <= 0 ? "translate-y-300" : "translate-y-0"
              } transition-transform duration-500`}
            >
              <PokemonCard pokemon={pokemon} />
            </div>
          </div>
        ))}
      </div>

      {/* Turn Logs */}
      {logReady && (
        <div className="mt-10 bg-gray-100 p-4 rounded-lg max-w-2xl mx-auto shadow">
          {battleLog[currentLogIndex] && (
            <>
              <h2 className="text-lg font-semibold text-indigo-600 mb-2">
                Turn {battleLog[currentLogIndex].turn}
              </h2>
              <ul className="list-disc list-inside space-y-1">
                {battleLog[currentLogIndex].actions.map((action, index) => (
                  <li key={index} className="text-sm text-gray-800">
                    {action.message}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BattleRoyale;
