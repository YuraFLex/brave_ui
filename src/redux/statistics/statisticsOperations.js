import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://204.62.13.40:3020';
// axios.defaults.baseURL = 'http://localhost:3020';

export const fetchStatistics = createAsyncThunk(
    'statistics/fetchStatistics',
    async ({ partnerId, type }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/statistics/${partnerId}/${type}`);
            console.log('Данные отправленные на сервер', response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


