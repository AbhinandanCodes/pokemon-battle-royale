import { useEffect, useRef } from "react";
import { TurnLog, BattlePokemon } from "../features/battle/types";

export const useBattleAnimation = (
  battleLog: TurnLog[],
  updatedPokemons: BattlePokemon[],
  setUpdatedPokemons: React.Dispatch<React.SetStateAction<BattlePokemon[]>>,
  setCurrentLogIndex: (index: number) => void,
  hasPlayed: boolean,
  setHasPlayed: (v: boolean) => void,
  setLogReady: (v: boolean) => void,
  speedFactor: number,
  paused: boolean
) => {
  const pausedRef = useRef(paused);
  const speedFactorRef = useRef(speedFactor);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    speedFactorRef.current = speedFactor;
  }, [speedFactor]);

  useEffect(() => {
    if (!hasPlayed && battleLog.length > 0 && updatedPokemons.length > 0) {
      const playBattle = async () => {
        setHasPlayed(true);
        setLogReady(true);

        const delay = async (ms: number) => {
          const scaled = ms * speedFactorRef.current;
          let elapsed = 0;
          const interval = 50;
          while (elapsed < scaled) {
            if (pausedRef.current) {
              await new Promise<void>((res) => {
                const check = setInterval(() => {
                  if (!pausedRef.current) {
                    clearInterval(check);
                    res();
                  }
                }, 100);
              });
            }
            await new Promise((r) => setTimeout(r, interval));
            elapsed += interval;
          }
        };

        for (let i = 0; i < battleLog.length; i++) {
          const turn = battleLog[i];
          setCurrentLogIndex(i);
          await delay(300);

          for (const action of turn.actions) {
            const attacker = document.getElementById(String(action.attackerId));
            const defender = document.getElementById(String(action.defenderId));

            if (attacker && defender) {
              const attackerRect = attacker.getBoundingClientRect();
              const defenderRect = defender.getBoundingClientRect();

              const deltaX =
                defenderRect.left - attackerRect.left +
                defenderRect.width / 2 -
                attackerRect.width / 2;
              const deltaY =
                defenderRect.top - attackerRect.top +
                defenderRect.height / 2 -
                attackerRect.height / 2;

              attacker.style.transition = "transform 0.3s ease-in-out";
              attacker.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

              defender.classList.add("bg-red-100");
              setTimeout(() => defender.classList.remove("bg-red-100"), 150);
              setTimeout(() => {
                attacker.style.transform = `translate(0, 0)`;
              }, 300);

              await delay(500);
            }

            setUpdatedPokemons((prev) => {
              const updated = [...prev];
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
              return updated;
            });

            await delay(50);
          }

          await delay(100);
        }
      };

      playBattle();
    }
  }, [
    battleLog,
    updatedPokemons.length,
    hasPlayed,
    setCurrentLogIndex,
    setHasPlayed,
    setUpdatedPokemons,
    setLogReady,
  ]);
};
