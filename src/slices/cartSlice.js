import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  itemsCount: 0,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingProduct = state.cart.find((e) => e.id === product.id);

      const updatedCart = [...state.cart];

      if (!existingProduct) {
        updatedCart.push(product);
        state.totalAmount += Number(product.price);
        state.cart = updatedCart;
        state.itemsCount += 1;
        return;
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const updatedCart = [...state.cart];
      const existingItemIndex = state.cart.findIndex((e) => e.id === id);
      const existingItem = updatedCart[existingItemIndex];

      if (existingItemIndex === -1) {
        return;
      }

      state.totalAmount -= Number(existingItem.price);
      updatedCart.splice(existingItemIndex, 1);

      state.cart = [...updatedCart];
      state.itemsCount--;
    },
    clearCart: (state) => {
      state.cart = [];
      state.itemsCount = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, initializeCart } =
  cartSlice.actions;

export default cartSlice.reducer;
