import { createSlice } from "@reduxjs/toolkit";
import { fetchCahrtData } from "./chartOperation";

const initialState = {
    chartData: null,
    isLoading: false,
    error: null,
}

const chartSlice = createSlice({
    name: 'chartData',
    initialState,

    extraReducers: {
        [fetchCahrtData.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [fetchCahrtData.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.chartData = payload;
        },
        [fetchCahrtData.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        }
    }
})

export const chartReducer = chartSlice.reducer