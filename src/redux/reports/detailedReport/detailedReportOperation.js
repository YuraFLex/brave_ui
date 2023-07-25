import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "constans/urls";

axios.defaults.baseURL = `${API_BASE_URL}`

export const fetchDetailedReports = createAsyncThunk(
    'detailedReport/fetchDetailedReports',

    async (data, { rejectWithValue }) => {
        console.log('fetchDetailedReports data:', data);

        try {
            const response = await axios.get('/reports/detalied', { params: data })

            console.log('response.data:', response.data);
            return response.data

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)