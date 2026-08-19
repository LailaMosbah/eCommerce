import { createSlice } from "@reduxjs/toolkit";
import { getProductsByCategory } from "./productsThunks";
import type { ProductsState } from "../../types";

const initialState: ProductsState = {
  records: [],
  loading: "idle",
  error: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsByCategory.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getProductsByCategory.fulfilled, (state, action) => {
      state.loading = "succeeded";
      // console.log("Products data in fulfilled case:");
      // console.log(action.payload);
      state.records = action.payload;
      state.error = null;
    });
    builder.addCase(getProductsByCategory.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload || "Failed to fetch products";
      state.records = [];
    });
  },
});

// Action creators are generated for each case reducer function
// export const { } =
//   productsSlice.actions;

export const { productsCleanUp } = productsSlice.actions;
export default productsSlice.reducer;
export { getProductsByCategory };
