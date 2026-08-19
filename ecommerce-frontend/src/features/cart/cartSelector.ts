import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

const getCartItems = (state: RootState) => state.cart.items;

//createSelector for memoizaion
//createSelector(inputSelector,outputSelector)
const getCartItemsCount = createSelector([getCartItems], (cartItems) =>
  Object.values(cartItems).reduce((total, count) => total + count, 0),
);

export { getCartItems, getCartItemsCount };
