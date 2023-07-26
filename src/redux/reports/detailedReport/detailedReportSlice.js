import { createSlice } from "@reduxjs/toolkit";
import { fetchDetailedReports, fetchSizes } from "./detailedReportOperation";

const initialState = {
    detailedReportsData: null,
    sizesList: null,
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

export const detailedReportReducer = detailedReportSlice.reducer