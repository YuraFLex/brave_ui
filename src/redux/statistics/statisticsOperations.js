import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../constans/urls';

axios.defaults.baseURL = `${API_BASE_URL}`;

export const fetchStatistics = createAsyncThunk(
    'statistics/fetchStatistics',
    async ({ partnerId, type }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/statistics/${partnerId}/${type}`);
            console.log('Данные отправленные на сервер', response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


