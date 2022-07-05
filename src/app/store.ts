import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import pokeReducer from '../features/pokes/PokeSlice';

export function makeStore() {
  return configureStore({
    reducer: { pokes: pokeReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
