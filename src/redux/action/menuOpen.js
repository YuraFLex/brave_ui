import { createSlice } from "@reduxjs/toolkit";

const menuOpenSlice = createSlice({
    name: 'menuOpen',
    initialState: false,
    reducers: {
        changeMenuOpen: (state, action) => {
            return action.payload
        },
    },
})

export const { changeMenuOpen } = menuOpenSlice.actions;
export default menuOpenSlice.reducer;