import { createSlice } from "@reduxjs/toolkit";
import { authRegister, authLogin } from "./authThunks";

import { isString, type Loading } from "../../types";

interface AuthState {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  } | null;
  accessToken: string | null;
  loading: Loading;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auht",
  initialState,
  reducers: {
    clearStateAuth: (state) => {
      state.error = null;
      state.loading = "idle";
    },
    authLogout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(authRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(authRegister.fulfilled, (state) => {
      state.loading = "succeeded";
      state.error = null;
    });

    builder.addCase(authRegister.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });

    // Login
    builder.addCase(authLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.error = null;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    });

    builder.addCase(authLogin.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});

export const { clearStateAuth, authLogout } = authSlice.actions;
export { authRegister, authLogin };
export default authSlice.reducer;
