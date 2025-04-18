import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import pokemonReducer from "../features/pokemon/pokemonSlice";
import battleReducer from "../features/battle/battleSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["pokemon"],
};

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  battle: battleReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
