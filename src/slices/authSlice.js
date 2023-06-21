import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  token: "",
  userId: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      const token = action.payload.token;
      const userId = action.payload.userId;

      state.isAuth = true;
      state.token = token;
      state.userId = userId;
    },
    clearAuthState: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExp");
      localStorage.removeItem("userId");

      state.isAuth = false;
      state.token = "";
      state.userId = "";
    },
  },
});

export const { setAuthState, clearAuthState, getAuthState } = authSlice.actions;

export default authSlice.reducer;
