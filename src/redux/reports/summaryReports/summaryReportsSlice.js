import { createSlice } from "@reduxjs/toolkit";
import { downloadSummaryReportsCSV, fetchSummaryReports } from "./summaryReportsOperations";

const initialState = {
    summaryReportsData: null,
    isLoading: false,
    error: null,
};

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
        },
        [downloadSummaryReportsCSV.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [downloadSummaryReportsCSV.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [downloadSummaryReportsCSV.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        }
    }
});

export const summaryReportsReducer = summaryReportsSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";
// import { downloadSummaryReportsCSV, fetchSummaryReports } from "./summaryReportsOperations";

// const initialState = {
//     summaryReportsData: null,
//     isLoading: false,
//     error: null,
// };

// const blobToString = (blob) => {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             resolve(reader.result);
//         };
//         reader.onerror = reject;
//         reader.readAsText(blob);
//     });
// };

// const summaryReportsSlice = createSlice({
//     name: 'summaryReports',
//     initialState,

//     extraReducers: {
//         [fetchSummaryReports.pending]: (state) => {
//             state.isLoading = true;
//             state.error = null;
//         },
//         [fetchSummaryReports.fulfilled]: (state, { payload }) => {
//             state.isLoading = false;
//             state.summaryReportsData = payload;
//         },
//         [fetchSummaryReports.rejected]: (state, { payload }) => {
//             state.isLoading = false;
//             state.error = payload;
//         },
//         [downloadSummaryReportsCSV.pending]: (state) => {
//             state.isLoading = true;
//             state.error = null;
//         },
//         [downloadSummaryReportsCSV.fulfilled]: (state, { payload }) => {
//             blobToString(payload).then((csvString) => {
//                 state.isLoading = false;
//                 state.summaryReportsData = csvString;
//             });
//         },
//         [downloadSummaryReportsCSV.rejected]: (state, { payload }) => {
//             state.isLoading = false;
//             state.error = payload;
//         }
//     },
// });

// export const summaryReportsReducer = summaryReportsSlice.reducer;
