import { createSlice } from "@reduxjs/toolkit";

// Thunks
import { toggleLikeProduct, getWishlistProducts } from "./wishlistThunks";

import type { WishListState } from "../../types";

const initialState: WishListState = {
  productsId: [],
  error: null,
  loading: "idle",
  productsFullInfo: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    productsFullInfoCleanUp: (state) => {
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    // Handle toggleLikeProduct thunk
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
        state.productsFullInfo = state.productsFullInfo.filter(
          (product) => product.id !== action.payload.productId,
        );
      }
    });
    builder.addCase(toggleLikeProduct.rejected, (state, action) => {
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // Handle getWishlistProducts thunk
    builder.addCase(getWishlistProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getWishlistProducts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      console.log("Wishlist products fetched successfully:", action.payload);
      state.productsFullInfo = action.payload;
    });
    builder.addCase(getWishlistProducts.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export default wishlistSlice.reducer;
export const { productsFullInfoCleanUp } = wishlistSlice.actions;
export { toggleLikeProduct, getWishlistProducts };
