import { configureStore } from "@reduxjs/toolkit";
import bagSlice from "./slices/bagSlice";
import itemsSlice from "./slices/itemSlice";
import orderIdSlice from "./slices/orderidSlice";

const shopStore = configureStore({
  reducer: {
    bag: bagSlice.reducer,
    items: itemsSlice.reducer,
    orderId: orderIdSlice.reducer,
  },
});
export default shopStore;
