import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "../features/pokemon/pokemonSlice";
import battleReducer from "../features/battle/battleSlice";

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    battle: battleReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
