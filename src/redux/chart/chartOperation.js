import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';
import { API_BASE_URL } from "constans/urls";

axios.defaults.baseURL = `${API_BASE_URL}`

export const fetchCahrtData = createAsyncThunk(
    'chartData/fetchCahrtData',

    async (chartData, { rejectWithValue }) => {

        try {

            const { data } = await axios.get('/statistics/chart_data', { params: chartData })
            // console.log('data:', data);
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }

            return data;

        } catch (error) {
            if (error.response) {

                const { data } = error.response;
                toast.error(data.message);
                return rejectWithValue(data.message);
            } else {

                toast.error(error.message);
                return rejectWithValue(error.message);
            }
        }
    }
)
