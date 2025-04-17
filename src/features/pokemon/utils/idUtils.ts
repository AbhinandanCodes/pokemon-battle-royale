import { MoveObject } from "../types";

const MAX_POKEMON_ID = 151;

export const getRandomIDs = (count: number): number[] => {
  const ids = new Set<number>();
  while (ids.size < count) {
    const randId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
    ids.add(randId);
  }
  return Array.from(ids);
};

export const extractMoveIds = (moveObjects: MoveObject[]): number[] => {
  const urls = moveObjects.map((moveObj) => moveObj.move.url);
  return urls
    .map((url) => {
      const match = url.match(/\/move\/(\d+)\//);
      return match ? parseInt(match[1]) : -1;
    })
    .filter((id) => id != -1);
};
