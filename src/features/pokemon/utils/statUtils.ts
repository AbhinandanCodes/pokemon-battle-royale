import { Stat, StatData } from "../types";

export const extractStats = (statsData: StatData[]): Stat => {
  return {
    hp: statsData[0].base_stat,
    atk: statsData[1].base_stat,
    def: statsData[2].base_stat,
    spatk: statsData[3].base_stat,
    spdef: statsData[4].base_stat,
    speed: statsData[5].base_stat,
  };
};
