import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PokemonsState } from "./types";
import { fetchPokemonFromAPI } from "./api/pokemonAPI";
import { getRandomIDs } from "./utils/idUtils";
import { AppDispatch } from "../../app/store";

const initialState: PokemonsState = {
  loading: false,
  data: [],
  error: null,
};

export const fetchPokemon = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch }
>("pokemon/fetchPokemonData", async (count: number = 5, { dispatch }) => {
  const randomIds = getRandomIDs(count);
  for (const id of randomIds)
    try {
      const pokemon = await fetchPokemonFromAPI(id);
      dispatch(addPokemon(pokemon));
    } catch (err) {
      dispatch(clearData());
      throw new Error(`Failed to fetch all ${count} pokemon retry`);
    }
});

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    clearData: (state) => {
      state.error = null;
      state.data = [];
    },
    addPokemon: (state, action) => {
      state.data.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.loading = true;
        state.data = [];
        state.error = null;
      })
      .addCase(fetchPokemon.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "failed to fetch pokemon data";
      });
  },
});

export const { clearData, addPokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
