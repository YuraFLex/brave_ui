import { createSlice } from '@reduxjs/toolkit';
import { login } from './authOperations';

const initialState = {
  user: {
    name: '',
    email: '',
    password: '',
  },
  isActive: null,
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
      if (isActive !== state.isActive) {
        state.isActive = isActive;
      }
    },
    [login.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    // [getIsActive.pending]: (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    // },
    // [getIsActive.fulfilled]: (state, { payload }) => {
    //   state.isLoading = false;

    //   // Проверяем, отличается ли новое значение isActive от текущего
    //   if (payload !== state.isActive) {
    //     state.isActive = payload;
    //   }
    // },
    // [getIsActive.rejected]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.error = payload;
    // },
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
