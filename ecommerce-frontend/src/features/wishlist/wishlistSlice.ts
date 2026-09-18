import { createSlice } from "@reduxjs/toolkit";

// Thunks
import toggleLikeProduct from "./wishlistThunks";

import type { WishListState } from "../../types";

const initialState: WishListState = {
  productsId: [],
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleLikeProduct.pending, (state) => {
      state.error = null;
    });
    builder.addCase(toggleLikeProduct.fulfilled, (state, action) => {
      if (action.payload.type == "add") {
        state.productsId.push(action.payload.productId);
      } else {
        state.productsId = state.productsId.filter(
          (id) => id !== action.payload.productId,
        );
      }
    });
    builder.addCase(toggleLikeProduct.rejected, (state, action) => {
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export default wishlistSlice.reducer;
export { toggleLikeProduct };
