import { MoveCache, PokemonCache } from "../features/pokemon/types";

const pokemonCache = new Map<number, PokemonCache>();
const moveCache = new Map<number, MoveCache>();

export const getCachedPokemon = (id: number) => pokemonCache.get(id);
export const setPokemonCache = (id: number, pokemon: PokemonCache) =>
  pokemonCache.set(id, pokemon);

export const getCachedMove = (id: number) => moveCache.get(id);
export const setMoveCache = (id: number, move: MoveCache) =>
  moveCache.set(id, move);
