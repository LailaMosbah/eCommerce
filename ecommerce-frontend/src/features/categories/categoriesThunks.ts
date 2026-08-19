import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Category } from "../../types";

const getCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string | null }
>("categories/getCategories", async (_, thunkAPI) => {
  // const { isRejectedWithValue } = thunkAPI;

  try {
    const response = await axios.get<Category[]>("/categories");
    // console.log("API Response data:(categoriesThunks)");
    // console.log(response);
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

export { getCategories };
