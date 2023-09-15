import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "constans/urls";

axios.defaults.baseURL = `${API_BASE_URL}`

export const fetchCahrtData = createAsyncThunk(
    'chartData/fetchCahrtData',

    async (data, { rejectWithValue }) => {

        try {
            const response = await axios.get('/statistics/chart_data', { params: data })

            return response.data

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
