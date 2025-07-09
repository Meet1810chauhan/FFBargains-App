import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import Login from "../screen/Login";

interface LoginState {
  isLogin: boolean;
  isOnboarding: boolean;
}

const initialState: LoginState = {
  isLogin: false,
  isOnboarding: false,
};

export const LoginSlice = createSlice({
  name: "Login",
  initialState,

  reducers: {
    // function create
    setIsLogin: (state, action) => {
      // state.isLogin = true;

      state.isLogin = action.payload;
      console.log("setIsLogin", action.payload);
    },

    setOnboarding: (state, action) => {
      state.isOnboarding = action.payload;
    },
  },
});

export const { setIsLogin } = LoginSlice.actions;
export const { setOnboarding } = LoginSlice.actions;
export default LoginSlice.reducer;
