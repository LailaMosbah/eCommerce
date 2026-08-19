import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Product } from "../../types";
// import type { getCategories } from "./productsSlice";

const getProductsByCategory = createAsyncThunk<
  Product[],
  string,
  { rejectValue: string | null }
>("products/getProductsByCategory", async (prefix, thunkAPI) => {
  try {
    const response = await axios.get<Product[]>(
      `/products?cat_prefix=${prefix}`,
    );
    // console.log("API Response data:(productsThunks)");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.response?.data || null);
    } else {
      return thunkAPI.rejectWithValue("An unexpected error occurred");
    }
  }
});

export { getProductsByCategory };
