import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "@utils";

//Types
import type { RootState } from "@app/store";
import type { Product } from "../../types";

// import type { WishListState } from "../../types";

type DataType = "productsFullInfo" | "productIds";

//Toggle like status of a product in the wishlist
const toggleLikeProduct = createAsyncThunk(
  "wishlist/toggleLikeProduct",
  async (productId: number, thunkAPI) => {
    console.log(`Toggling like status for product with ID: ${productId}`);
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
      const isRecordExist = await axios.get(
        `/wishlist?userId=${auth.user?.id}&productId=${productId}`,
      );

      if (isRecordExist.data.length > 0) {
        await axios.delete(`/wishlist/${isRecordExist.data[0].id}`);
        return { type: "remove", productId };
      } else {
        await axios.post(`/wishlist`, { userId: auth.user?.id, productId });
        return { type: "add", productId };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

// Fetch wishlist products for a user
type WishlistProduct = Product[];

const getWishlistProducts = createAsyncThunk(
  "wishlist/getWishlistProducts",
  async (dataType: DataType, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=${auth.user?.id}`,
        { signal },
      );

      if (userWishlist.data.length === 0) {
        return { data: [], dataType: "empty" }; // Return an empty array if there are no products in the wishlist
      }

      if (dataType == "productIds") {
        const concatenatedIds = userWishlist.data.map(
          (item) => `${item.productId}`,
        );
        return { data: concatenatedIds, dataType: "productsId" };
      } else {
        const concatenatedIds = userWishlist.data
          .map((item) => `id=${item.productId}`)
          .join("&");

        const response = await axios.get<WishlistProduct>(
          `/products?${concatenatedIds}`,
        );
        // return fulfillWithValue(response.data);
        return { data: response.data, dataType: "productsFullInfo" };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.message ||
            error.message ||
            "An error occurred while fetching the wishlist products",
        );
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  },
);

export { toggleLikeProduct, getWishlistProducts };
