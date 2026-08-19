import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types";

type CartState = {
  items: { [key: number]: number };
  productsFullInfo: Product[];
};

const initialState: CartState = {
  items: {},
  productsFullInfo: [],
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
});

// const getCartItemsCount = createSelector(
//   (state: RootState) => state.cart.items,
//   (cartItems) => {
//     return Object.values(cartItems).reduce((total, count) => total + count, 0);
//   },
// );

export const { addToCart } = cartSlice.actions;
// export { getCartItemsCount };
export default cartSlice.reducer;
