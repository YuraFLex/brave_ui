import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "constans/urls";

axios.defaults.baseURL = `${API_BASE_URL}`

export const fetchSizes = createAsyncThunk(
    'sizes/fetchSizes',

    async ({ partnerId, type }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/reports/detalied/${partnerId}/${type}`)

            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)