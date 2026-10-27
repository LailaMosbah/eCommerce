import { createSlice } from "@reduxjs/toolkit";

import { actOrderPlace } from "./ordersThunk";
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
  reducers: {},
  extraReducers: (builder) => {
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
  },
});

export { actOrderPlace };
export default orderSlice.reducer;
