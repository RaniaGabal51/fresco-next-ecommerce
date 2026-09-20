import { configureStore } from "@reduxjs/toolkit";
import { authReducer, initialState } from "../features/auth/slices/auth.slice";

export type PreloadedState = {
  authReducer: initialState;
};

export function createStore(preloadedState: PreloadedState) {
  const myStore = configureStore({
    reducer: {
      authReducer,
    },
    preloadedState,
  });

  return myStore;
}

export type appStore = ReturnType<typeof createStore>;
export type appState = ReturnType<appStore["getState"]>;
