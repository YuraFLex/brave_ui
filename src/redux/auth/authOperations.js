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



export const getIsActive = createAsyncThunk(
  'auth/getIsActive',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`/api/active/${id}`);
      const newIsActive = response.data.isActive;

      if (newIsActive !== auth.isActive) {
        return newIsActive;
      } else {
        return auth.isActive;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { auth } = getState();
      if (auth.isActive !== null) {
        return false; // Запрос не будет повторно выполнен
      }
      return true; // Запрос будет выполнен только при обновлении страницы
    }
  }
);

