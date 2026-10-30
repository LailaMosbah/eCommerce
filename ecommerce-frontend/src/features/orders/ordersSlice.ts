import { createSlice } from "@reduxjs/toolkit";

import { actOrderPlace, actGetOrders } from "./ordersThunk";
import { isString, type Loading, type OrderItem } from "../../types";

interface OrderSlice {
  orderList: OrderItem[];
  loading: Loading;
  error: string | null;
}
const initialState: OrderSlice = {
  orderList: [],
  loading: "idle",
  error: null,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderPlaceStatus: (state) => {
      state.loading = "idle";
      state.error = "null";
    },
  },
  extraReducers: (builder) => {
    // actOrderPlace
    builder.addCase(actOrderPlace.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actOrderPlace.fulfilled, (state) => {
      state.loading = "succeeded";
    });

    builder.addCase(actOrderPlace.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // actGetOrders
    builder.addCase(actGetOrders.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actGetOrders.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.orderList = action.payload;
    });

    builder.addCase(actGetOrders.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export { actOrderPlace, actGetOrders };
export const { resetOrderPlaceStatus } = orderSlice.actions;
export default orderSlice.reducer;
