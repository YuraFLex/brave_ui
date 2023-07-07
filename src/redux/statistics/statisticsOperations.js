import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../constans/urls';

axios.defaults.baseURL = `${API_BASE_URL}`;

export const fetchStatistics = createAsyncThunk(
    'statistics/fetchStatistics',
    async (data, { rejectWithValue }) => {
        console.log('fetchStatistics data:', data);
        try {
            const response = await axios.get(`/statistics/${data.partnerId}/${data.type}`, { params: data });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
