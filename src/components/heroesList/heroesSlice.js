import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: "idle",
});

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", (filter) => {
  const { request } = useHttp();
  const url =
    filter === "all"
      ? "http://localhost:3001/heroes"
      : `http://localhost:3001/heroes?element=${filter}`;
  return request(url);
});

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    heroCreated: (state, action) => {
      heroesAdapter.addOne(state, action.payload);
    },
    heroDeleted: (state, action) => {
      heroesAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = "loading";
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = "idle";
        heroesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = heroesSlice;

export const heroesSelector = heroesAdapter.getSelectors(
  (state) => state.heroes
);

export const {
  heroesFetched,
  heroesFetching,
  heroesFetchingError,
  heroCreated,
  heroDeleted,
} = actions;

export default reducer;
