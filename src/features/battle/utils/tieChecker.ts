import { getEffectiveness } from "./typeEffectiveness";
import { BattlePokemon } from "../types";

export const isTie = (pokemons: BattlePokemon[]): boolean => {
  const alive = pokemons.filter((p) => !p.isFainted);

  if (alive.length <= 1) return false;

  let allIneffective = true;
  let allOutOfPP = true;

  for (let i = 0; i < alive.length; i++) {
    const attacker = alive[i];

    if (attacker.move.pp > 0) {
      allOutOfPP = false;

      for (let j = 0; j < alive.length; j++) {
        if (i === j) continue;
        const defender = alive[j];
        const effectiveness = getEffectiveness(
          attacker.move.type,
          defender.type
        );

        if (effectiveness > 0) {
          allIneffective = false;
          break;
        }
      }
    }
  }

  return allIneffective || allOutOfPP;
};
