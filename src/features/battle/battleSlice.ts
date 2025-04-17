import { Pokemon } from "../pokemon/types";
import { BattleState, TurnLog, TurnLogger } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { prepareBattlePokemon } from "./utils/battleUtils";
import { simulateBattle } from "./utils/battleEngine";
import { registerTurnLogCallback } from "./utils/logger";

const initialState: BattleState = {
  pokemons: [],
  winners: [],
  battleLog: [],
  battleEnd: false,
};

const deepClone = (obj: any): any => JSON.parse(JSON.stringify(obj));


const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    setPokemons: (state, action: PayloadAction<Pokemon[]>) => {
      state.pokemons = prepareBattlePokemon(action.payload);
      state.winners = [];
      state.battleLog = [];
      state.battleEnd = false;
    },
    startBattle: (state) => {
      const logs: TurnLog[] = [];
      const turnLogger: TurnLogger = (currTurn: TurnLog) =>
        logs.push(currTurn);
      registerTurnLogCallback(turnLogger);
      const result = simulateBattle(deepClone(state.pokemons));
      state.winners = result;
      state.battleLog = logs;
      state.battleEnd = true;
    },
    resetBattle: (state) => {
      state.pokemons = [];
      state.winners = [];
      state.battleLog = [];
      state.battleEnd = false;
    },
  },
});

export const { setPokemons, startBattle, resetBattle } = battleSlice.actions;

export default battleSlice.reducer;
