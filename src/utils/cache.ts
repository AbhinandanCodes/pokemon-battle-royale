import { MoveCache, PokemonCache } from "../features/pokemon/types";

const pokemonCache = new Map<number, PokemonCache>();
const moveCache = new Map<number, MoveCache>();

// Helper functions to load cache from localStorage
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

// Initial load from localStorage
loadPokemonCache();
loadMoveCache();

// Cache management functions
export const getCachedPokemon = (id: number) => pokemonCache.get(id);
export const setPokemonCache = (id: number, pokemon: PokemonCache) => {
  pokemonCache.set(id, pokemon);
  // Update localStorage whenever cache is modified
  localStorage.setItem("pokemonCache", JSON.stringify(Object.fromEntries(pokemonCache)));
};

export const getCachedMove = (id: number) => moveCache.get(id);
export const setMoveCache = (id: number, move: MoveCache) => {
  moveCache.set(id, move);
  // Update localStorage whenever cache is modified
  localStorage.setItem("moveCache", JSON.stringify(Object.fromEntries(moveCache)));
};
