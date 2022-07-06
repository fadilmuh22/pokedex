import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState, AppThunk } from '../../app/store';
import { fetchPokeDetail, fetchPokeList } from '~/api';
import { PokeDetailData, PokePaginationData } from './PokeType';

export interface PokeState {
  pokeList: PokePaginationData[];
  pokeDetail: { [key: string]: PokeDetailData };
  pokeStateStatus: 'idle' | 'loading' | 'failed';
  paginationOffset: number;
}

const initialState: PokeState = {
  pokeList: [] as PokePaginationData[],
  pokeDetail: {} as { [key: string]: PokeDetailData },
  pokeStateStatus: 'idle',
  paginationOffset: 0,
};

export const fetchPokeListAsync = createAsyncThunk(
  'poke/fetchPokeList',
  async (paginationOffset: number) => {
    const response = await fetchPokeList(paginationOffset);
    return response.data.results;
  },
);

export const fetchPokeDetailAsync = createAsyncThunk(
  'poke/fetchPokeDetail',
  async (name: string) => {
    const response = await fetchPokeDetail(name);
    return response.data;
  },
);

export const pokeSlice = createSlice({
  name: 'poke',
  initialState,
  reducers: {
    nextPage: (state) => {
      state.paginationOffset += 12;
    },
    addPokeList: (state, action: PayloadAction<PokePaginationData[]>) => {
      state.pokeList = [...state.pokeList, ...action.payload];
    },
    addPokeDetail: (state, action: PayloadAction<PokeDetailData>) => {
      state.pokeDetail[action.payload.name] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokeListAsync.pending, (state) => {
        state.pokeStateStatus = 'loading';
      })
      .addCase(
        fetchPokeListAsync.fulfilled,
        (state, action: PayloadAction<PokePaginationData[]>) => {
          state.pokeStateStatus = 'idle';
          state.pokeList = [...state.pokeList, ...action.payload];
        },
      )
      .addCase(fetchPokeDetailAsync.pending, (state) => {
        state.pokeStateStatus = 'loading';
      })
      .addCase(
        fetchPokeDetailAsync.fulfilled,
        (state, action: PayloadAction<PokeDetailData>) => {
          state.pokeStateStatus = 'idle';
          state.pokeDetail[action.payload.name] = action.payload;
        },
      );
  },
});

export const { nextPage, addPokeList, addPokeDetail } = pokeSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPokeList = (state: AppState) => state.pokes.pokeList;
export const selectPokeDetail = (state: AppState) => state.pokes.pokeDetail;
export const selectPokeStateStatus = (state: AppState) =>
  state.pokes.pokeStateStatus;
export const selectPaginationOffset = (state: AppState) =>
  state.pokes.paginationOffset;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default pokeSlice.reducer;
