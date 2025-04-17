import { Pokemon } from "../../pokemon/types";
import { BattlePokemon } from "../types";

export const LEVEL = 50;

const calculateHp = (baseHp: number): number => {
  return baseHp * 2 + LEVEL + 10;
};

export const prepareBattlePokemon = (pokemons: Pokemon[]): BattlePokemon[] => {
  return pokemons.map((pokemon) => {
    const calculatedHp = calculateHp(pokemon.stat.hp);
    return {
      ...pokemon,
      maxHp:calculatedHp,
      currentHp: calculatedHp,
      isFainted: false,
    };
  });
};

export const filterAlive = (pokemons: BattlePokemon[]): BattlePokemon[] => {
  return pokemons.filter((pokemon) => !pokemon.isFainted);
};

export const sortPokemons = (pokemons: BattlePokemon[]): BattlePokemon[] => {
  return [...pokemons].sort((p1, p2) => {
    if (p1.move.priority !== p2.move.priority) {
      return p2.move.priority - p1.move.priority;
    }
    return p2.stat.speed - p1.stat.speed;
  });
};

export const selectRandomOpponent = (
  attackerIdx: number,
  numberOfAlivePokemon: number
): number => {
  let randomIdx = Math.floor(Math.random() * numberOfAlivePokemon);
  while (randomIdx == attackerIdx) {
    randomIdx = Math.floor(Math.random() * numberOfAlivePokemon);
  }
  return randomIdx;
};
