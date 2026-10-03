import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import axios from "axios";
import { axiosErrorHandler } from "@utils";
import type { Product } from "../../types";

const getProductsByItems = createAsyncThunk(
  "cart/getProductsByItems",
  async (_, thunkAPI) => {
    const { getState, fulfillWithValue, rejectWithValue, signal } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.items);
    // console.log("itemsId:", itemsId);
    // console.log("concatenatedIds:", concatenatedIds);
    if (itemsId.length === 0) {
      return fulfillWithValue([]); // Return an empty array if there are no items in the cart
    }
    try {
      const concatenatedIds = itemsId.map((id) => `id=${id}`).join("&");
      const response = await axios.get<Product[]>(
        `/products?${concatenatedIds}`,
        { signal },
      );
      console.log("response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export { getProductsByItems };
