import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3020';

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

export const getIsActive = createAsyncThunk(
  'auth/getIsActive',
  async (id, { rejectWithValue }) => {
    console.log('ID:', id);
    try {
      const response = await axios.get(`/api/active/${id}`, id);
      console.log('RESPONSE', response);
      return response.state.isActive;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


