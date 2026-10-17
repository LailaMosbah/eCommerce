import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "@utils";

type FormDataRegister = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type FormDataLogin = {
  email: string;
  password: string;
};

type ResponseLogin = {
  accessToken: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
};

// Act Register
const authRegister = createAsyncThunk(
  "auth/authRegister",
  async (formData: FormDataRegister, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axios.post("/register", formData);

      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

// Act Login
const authLogin = createAsyncThunk(
  "auth/authLogin",
  async (formData: FormDataLogin, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axios.post<ResponseLogin>("/login", formData);

      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export { authRegister, authLogin };
