import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import type { WishListState } from "../../types";

const toggleLikeProduct = createAsyncThunk(
  "wishlist/toggleLikeProduct",
  async (productId: number, thunkAPI) => {
    console.log(`Toggling like status for product with ID: ${productId}`);
    const { rejectWithValue } = thunkAPI;

    try {
      const isRecordExist = await axios.get(
        `/wishlist?userId=1&productId=${productId}`,
      );

      if (isRecordExist.data.length > 0) {
        console.log(
          `Product with ID: ${productId} is already in the wishlist. Removing it.`,
        );
        await axios.delete(`/wishlist/${isRecordExist.data[0].id}`);
        return { type: "remove", productId };
      } else {
        console.log(
          `Product with ID: ${productId} is not in the wishlist. Adding it.`,
        );
        await axios.post(`/wishlist`, { userId: 1, productId });
        return { type: "add", productId };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.message ||
            error.message ||
            "An error occurred while toggling the like status",
        );
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  },
);

export default toggleLikeProduct;
