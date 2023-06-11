import { createSlice } from '@reduxjs/toolkit';
import { fetchStatistics } from './statisticsOperations';

const initialState = {
    statisticsData: null,
    isLoading: false,
    error: null,
};

const statisticsSlice = createSlice({
    name: 'statistics',
    initialState,

    extraReducers: {
        [fetchStatistics.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [fetchStatistics.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.statisticsData = payload;
        },
        [fetchStatistics.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
    },
});

export const { clearStatistics } = statisticsSlice.actions;
export const statisticsReducer = statisticsSlice.reducer;
