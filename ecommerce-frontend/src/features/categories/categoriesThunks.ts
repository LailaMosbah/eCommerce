import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "@utils";
import type { Category } from "../../types";

const getCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string | null }
>("categories/getCategories", async (_, thunkAPI) => {
  // const { isRejectedWithValue } = thunkAPI;
  const { rejectWithValue, signal } = thunkAPI;

  try {
    const response = await axios.get<Category[]>("/categories", { signal });
    // console.log("API Response data:(categoriesThunks)");
    // console.log(response);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error));
  }
});

export { getCategories };
