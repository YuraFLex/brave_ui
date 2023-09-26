import { createSlice } from "@reduxjs/toolkit";

const statPeriodSlice = createSlice({
    name: 'period',
    initialState: 'today',
    reducers: {
        statPeriod: (state, action) => {
            return action.payload;
        },
    },
});

export const { statPeriod } = statPeriodSlice.actions;
export default statPeriodSlice.reducer;

