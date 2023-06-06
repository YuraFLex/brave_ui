import { createSlice } from '@reduxjs/toolkit';
import { login } from './authOperations';

const initialState = {
  user: {
    email: '',
    password: '',
    isActive: null,
    partner_id: null,
  },
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
      state.partner_id = state.user.partner_id
      state.isActive = isActive
    },
    [login.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
