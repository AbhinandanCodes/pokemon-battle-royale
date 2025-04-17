import { Move, MoveCache } from "../types";
import pokeAPIClient from "../../../services/pokeAPIClient";
import { getCachedMove, setMoveCache } from "../../../utils/cache";


const fallbackMove: Move = {
  id: 165,
  name: "struggle",
  type: "normal",
  power: 50,
  pp: 10,
  damageClass: "physical",
  priority: 0,
  accuracy: 100,
};

export const fetchMovesFromAPI = async (moves: number[]): Promise<Move[]> => {
  try {
    const validMoves: Move[] = [];

    for (const id of moves) {
      const cachedMove = await createCachedMove(id);
      if (
        cachedMove.damageClass &&
        (cachedMove.damageClass === "physical" || cachedMove.damageClass === "special") &&
        cachedMove.power !== 0
      ) {
        validMoves.push(cachedMove);
      }
    }

    if (validMoves.length === 0) {
      return [fallbackMove];
    }

    return validMoves;
  } catch (err) {
    console.error("Error fetching moves: ", err);
    throw err;
  }
};

export const getRandomMove = (moves: Move[]): Move => {
  const length = moves.length;
  return moves[Math.floor(Math.random() * length)];
};

const createCachedMove = async (id: number): Promise<MoveCache> => {
  const cached = getCachedMove(id);
  if (cached) {
    return cached;
  }
  const move = await pokeAPIClient.get(`/move/${id}`);
  const moveData = move.data;
  const name: string = moveData.name;
  const type: string = moveData.type.name;
  const power: number = moveData.power || 0;
  const pp: number = moveData.pp || 0;
  const damageClass: string = moveData.damage_class.name || "unknown";
  const priority: number = moveData.priority || 0;
  const accuracy: number = moveData.accuracy || 100;
  const cachedMove: MoveCache = {
    id:id,
    name: name,
    type: type,
    power: power,
    pp: pp,
    damageClass: damageClass,
    priority: priority,
    accuracy: accuracy,
  };
  setMoveCache(id, cachedMove);
  return cachedMove;
};
