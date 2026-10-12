import { configureStore } from "@reduxjs/toolkit";
import { authReducer, initialState } from "../features/auth/slices/auth.slice";
import { cartReducer, CartValuesType } from "../features/cart/slices/cart.slice";

export type PreloadedState = {
  authReducer: initialState;
  cartReducer: CartValuesType
};

export function createStore(preloadedState: PreloadedState) {
  const myStore = configureStore({
    reducer: {
      authReducer,
      cartReducer
    },
    preloadedState,
  });

  return myStore;
}

export type appStore = ReturnType<typeof createStore>;
export type appState = ReturnType<appStore["getState"]>;
