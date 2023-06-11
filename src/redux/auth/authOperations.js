import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://204.62.13.40:3020';
// axios.defaults.baseURL = 'http://localhost:3020';

export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/login', userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
