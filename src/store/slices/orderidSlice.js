import { createSlice } from "@reduxjs/toolkit";

const orderIdSlice = createSlice({
  name: "orderId",
  initialState: null,
  reducers: {
    setOrderId(state, action) {
      return action.payload;
    },
    clearOrderId(state) {
      return null;
    },
  },
});

export const orderIdActions = orderIdSlice.actions;
export default orderIdSlice;
