import { createSlice } from "@reduxjs/toolkit";
import { fetchEndPoint } from "./endPointOperations";

const initialState = {
    endPointList: null,
    isLoading: false,
    error: null,
}

const endPointSlice = createSlice({
    name: 'endPoint',
    initialState,

    extraReducers: {
        [fetchEndPoint.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [fetchEndPoint.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.endPointList = payload;
        },
        [fetchEndPoint.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload
        }
    }
})

export const endPointReducer = endPointSlice.reducer