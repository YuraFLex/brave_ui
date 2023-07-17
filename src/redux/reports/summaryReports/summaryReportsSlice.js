import { createSlice } from "@reduxjs/toolkit";
import { fetchSummaryReports } from "./summaryReportsOperations";

const initialState = {
    summaryReportsData: null,
    isLoading: false,
    error: null,
}

const summaryReportsSlice = createSlice({
    name: 'summaryReports',
    initialState,

    extraReducers: {
        [fetchSummaryReports.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [fetchSummaryReports.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.summaryReportsData = payload;
        },
        [fetchSummaryReports.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        }

    }
})

export const summaryReportsReducer = summaryReportsSlice.reducer