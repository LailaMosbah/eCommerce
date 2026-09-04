import { createSlice } from "@reduxjs/toolkit";

// Thunks
import toggleLikeProduct from "./wishlistThunks";

import type { WishListState } from "../../types";

const initialState: WishListState = {
  productsId: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
});

export default wishlistSlice.reducer;
export { toggleLikeProduct };
