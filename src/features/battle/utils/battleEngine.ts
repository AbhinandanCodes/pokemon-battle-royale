import { BattlePokemon, TurnLog } from "../types";
import { filterAlive, sortPokemons, selectRandomOpponent } from "./battleUtils";
import { doDamage } from "./doDamage";
import { startNewTurnLog, submitTurnLog } from "./logger";
import { isTie } from "./tieChecker";

export const simulateBattle = (pokemons: BattlePokemon[]): BattlePokemon[] => {
  let turn = 1;
  while (pokemons.length > 1) {
    const currTurn: TurnLog = {
      turn: turn,
      actions: [],
    };
    startNewTurnLog(currTurn);
    if (isTie(pokemons)) {
      return pokemons;
    }
    const sortedPokemons = sortPokemons(pokemons);
    const numberOfAlivePokemon = pokemons.length;
    for (
      let attackerIdx = 0;
      attackerIdx < numberOfAlivePokemon;
      attackerIdx++
    ) {
      const defenderIdx = selectRandomOpponent(
        attackerIdx,
        numberOfAlivePokemon
      );
      doDamage(attackerIdx, defenderIdx, sortedPokemons);
    }
    const alive = filterAlive(pokemons);
    pokemons = alive;
    submitTurnLog(currTurn);
    turn++;
  }
  return pokemons;
};
