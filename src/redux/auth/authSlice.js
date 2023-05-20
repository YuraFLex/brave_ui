import { createSlice } from '@reduxjs/toolkit';
import { login, getIsActive } from './authOperations';

const initialState = {
  user: {
    name: '',
    email: '',
    password: '',
  },
  isActive: true,
  isLoading: false,
  isLoggedIn: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    }
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, { payload: { user, isActive } }) => {
      state.isLoading = false;
      state.user = user;
      state.isLoggedIn = true;
      state.isActive = isActive;
    },
    [login.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [getIsActive.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getIsActive.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isActive = payload;
    },
    [getIsActive.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
