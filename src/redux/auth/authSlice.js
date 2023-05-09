import { createSlice } from '@reduxjs/toolkit';
import { registration, login, logout } from './authOperations';

const initialState = {
  user: {
    name: '',
    email: '',
    password: '',
  },
  isLoading: false,
  isLoggedIn: false,
  error: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  isLoggedIn: false,

  extraReducers: {
    [registration.pending]: state => {
      state.isLoading = true;
    },
    [registration.fulfilled]: (state, { payload: { user, accessToken } }) => {
      state.isLoading = false;
      state.user = user;
      state.token = accessToken;
      state.isLoggedIn = true;
    },
    [registration.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [login.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, { payload: { user, accessToken } }) => {
      state.isLoading = false;
      state.user = user;
      state.token = accessToken;
      state.isLoggedIn = true;
    },
    [login.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [logout.pending]: state => {
      state.isLoading = true;
    },
    [logout.fulfilled]: state => {
      state.isLoading = false;
      state.user = {
        name: '',
        email: '',
        password: '',
      };
      state.token = null;
      state.isLoggedIn = false;
    },
    [logout.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const authReducer = authSlice.reducer;
