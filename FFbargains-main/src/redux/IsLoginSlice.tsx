import {createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';
import Login from '../screen/Login';

interface LoginState {
  isLogin: boolean;
}

const initialState: LoginState = {
  isLogin: false,
};

export const LoginSlice = createSlice({
  name: 'Login',
  initialState,

  reducers: {
    // function create
    setIsLogin: (state, action) => {
      // state.isLogin = true;
      state.isLogin = action.payload;
      // console.log('setIsLogin');
    },
  },
});

export const {setIsLogin} = LoginSlice.actions;
export default LoginSlice.reducer;
