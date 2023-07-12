import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "constans/urls";

axios.defaults.baseURL = `${API_BASE_URL}`;

export const fetchSummaryReports = createAsyncThunk(
    'summaryReports/fetchSummaryReports',
    async (data, { rejectWithValue }) => {
        console.log('fetchSummaryReports data:', data);

        try {
            const response = await axios.get('/reports/summary', { params: data })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)