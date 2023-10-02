import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from '../../constans/urls';

axios.defaults.baseURL = `${API_BASE_URL}`;

export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/login', userData);

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
);


