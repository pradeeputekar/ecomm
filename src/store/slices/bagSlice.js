import { createSlice } from "@reduxjs/toolkit";

const bagSlice = createSlice({
  name: "bag",
  initialState: [],
  reducers: {
    removeFromBag: (state, action) => {
      return state.filter((itemId) => itemId.productId !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.find((item) => item.productId === productId);

      if (existingItem) {
        existingItem.quantity = quantity;
      } else {
        state.push({ productId, quantity });
      }
    },
  },
});

export const bagActions = bagSlice.actions;

export default bagSlice;
