import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProductItem, CartResponse } from "../types/cart.types";

export type CartValuesType = {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string | null;
  data: {
    products: CartProductItem[];
    totalCartPrice: number;
  };
};

export const cartInitialValues: CartValuesType = {
  status: "",
  message: "",
  numOfCartItems: 0,
  cartId: null,
  data: {
    products: [],
    totalCartPrice: 0,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialValues,
  reducers: {
    setCartInfo: (state, action: PayloadAction<CartValuesType>) => {
      state.status = action.payload.status;
      state.numOfCartItems = action.payload.numOfCartItems;
      state.data = action.payload.data;
      state.message = action.payload.message;
      state.cartId = action.payload.cartId;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;

