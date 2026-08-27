import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product, Loading } from "../../types";

import { getProductsByItems } from "./cartThunks";

type CartState = {
  items: { [key: string]: number };
  productsFullInfo: Product[];
  loading: Loading;
  error: string | null;
};

const initialState: CartState = {
  items: {},
  productsFullInfo: [],
  loading: "idle",
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      // console.log("Adding to cart :" + action.payload);
      const idProduct = action.payload;
      if (state.items[idProduct]) {
        {
          state.items[idProduct] += 1;
        }
      } else {
        state.items[idProduct] = 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsByItems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getProductsByItems.fulfilled, (state, action) => {
      state.productsFullInfo = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(getProductsByItems.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

// const getCartItemsCount = createSelector(
//   (state: RootState) => state.cart.items,
//   (cartItems) => {
//     return Object.values(cartItems).reduce((total, count) => total + count, 0);
//   },
// );

export const { addToCart } = cartSlice.actions;
export { getProductsByItems };
// export { getCartItemsCount };
export default cartSlice.reducer;
