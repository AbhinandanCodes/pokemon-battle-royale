import { MoveCache, PokemonCache } from "../features/pokemon/types";

const pokemonCache = new Map<number, PokemonCache>();
const moveCache = new Map<number, MoveCache>();

const loadPokemonCache = () => {
  const storedCache = localStorage.getItem("pokemonCache");
  if (storedCache) {
    const parsedCache = JSON.parse(storedCache);
    Object.entries(parsedCache).forEach(([id, data]) => {
      pokemonCache.set(Number(id), data as PokemonCache);
    });
  }
};

const loadMoveCache = () => {
  const storedCache = localStorage.getItem("moveCache");
  if (storedCache) {
    const parsedCache = JSON.parse(storedCache);
    Object.entries(parsedCache).forEach(([id, data]) => {
      moveCache.set(Number(id), data as MoveCache);
    });
  }
};


loadPokemonCache();
loadMoveCache();


export const getCachedPokemon = (id: number) => pokemonCache.get(id);
export const setPokemonCache = (id: number, pokemon: PokemonCache) => {
  pokemonCache.set(id, pokemon);
  localStorage.setItem("pokemonCache", JSON.stringify(Object.fromEntries(pokemonCache)));
};

export const getCachedMove = (id: number) => moveCache.get(id);
export const setMoveCache = (id: number, move: MoveCache) => {
  moveCache.set(id, move);
  localStorage.setItem("moveCache", JSON.stringify(Object.fromEntries(moveCache)));
};
