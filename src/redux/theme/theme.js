import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState: '',
    reducers: {
        changeTheme: (state, action) => {
            return action.payload
        }
    }
})

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;