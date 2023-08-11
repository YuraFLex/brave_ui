import { createSlice } from "@reduxjs/toolkit";
import { fetchSizes } from "./sizesOperation";

const initialState = {
    sizesList: null,
    isLoading: null,
    error: null
}

const fetchSizesSlice = createSlice({
    name: 'sizes',
    initialState,

    extraReducers: {
        [fetchSizes.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [fetchSizes.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.sizesList = payload;
        },
        [fetchSizes.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
    }
})

export const fetchSizesReducer = fetchSizesSlice.reducer;