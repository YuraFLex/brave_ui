import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
    name: 'item',
    initialState: 'spending',
    reducers: {
        changeItem: (state, action) => {
            return action.payload;
        },
    },
});

export const { changeItem } = itemSlice.actions;
export default itemSlice.reducer;

