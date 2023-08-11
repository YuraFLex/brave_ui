import { createSlice } from "@reduxjs/toolkit";
import { fetchDetailedReports } from "./detailedReportOperation";

const initialState = {
    detailedReportsData: null,
    isLoading: false,
    error: null,
}

const detailedReportSlice = createSlice({
    name: "detailedReport",
    initialState,

    extraReducers: {
        [fetchDetailedReports.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [fetchDetailedReports.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.detailedReportsData = payload;
        },
        [fetchDetailedReports.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },



    }
})

export const detailedReportReducer = detailedReportSlice.reducer