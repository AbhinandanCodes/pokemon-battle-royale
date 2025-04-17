import pokeAPIClient from "../../../services/pokeAPIClient";
import { getCachedPokemon, setPokemonCache } from "../../../utils/cache";
import { Pokemon, Move, Stat, PokemonCache } from "../types";
import { extractMoveIds } from "../utils/idUtils";
import { extractStats } from "../utils/statUtils";
import { fetchMovesFromAPI, getRandomMove } from "./moveAPI";

export const fetchPokemonFromAPI = async (id: number): Promise<Pokemon> => {
  const cachedPokemon = await createCachedPokemon(id);
  const moves = await fetchMovesFromAPI(cachedPokemon.movesId);
  const randomMove: Move = getRandomMove(moves);
  const pokemon: Pokemon = {
    ...cachedPokemon,
    move: randomMove,
  };
  return pokemon;
};

const createCachedPokemon = async (id: number): Promise<PokemonCache> => {
  const cached = getCachedPokemon(id);
  if (cached) {
    return cached;
  }
  const response = await pokeAPIClient.get(`/pokemon/${id}`);
  const data = response.data;
  const movesId: number[] = extractMoveIds(data.moves);
  const name: string = data.name;
  const type: string = data.types[0].type.name;
  const stat: Stat = extractStats(data.stats);
  const sprite: string = data.sprites.front_default;
  const cachedPokemon: PokemonCache = {
    id: id,
    name: name,
    type: type,
    stat: stat,
    movesId: movesId,
    sprite: sprite,
  };
  setPokemonCache(id, cachedPokemon);
  return cachedPokemon;
};
