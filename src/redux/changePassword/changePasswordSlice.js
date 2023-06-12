import { createSlice } from '@reduxjs/toolkit';
import { changePassword } from './changePasswordOperations';

const initialState = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    isLoading: false,
    error: null,
};

const changePasswordSlice = createSlice({
    name: 'changePassword',
    initialState,

    extraReducers: {
        [changePassword.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [changePassword.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.changePassword = payload;
        },
        [changePassword.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
    },
});

export const changePasswordReducer = changePasswordSlice.reducer;
