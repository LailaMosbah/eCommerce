import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./categoriesThunks";
import type { CategoriesState } from "../../types";

const initialState: CategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      // console.log("Categories data in fulfilled case:");
      // console.log(action.payload);
      state.records = action.payload;
      state.error = null;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload || "Failed to fetch categories";
      state.records = [];
    });
  },
});

// Action creators are generated for each case reducer function
// export const { } =
//   categoriesSlice.actions;

export default categoriesSlice.reducer;
export { getCategories };
