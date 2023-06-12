import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

// axios.defaults.baseURL = 'http://204.62.13.40:3020/api';
axios.defaults.baseURL = 'http://localhost:3020/api';

export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    console.log('userData:', userData);
    try {
      const { data } = await axios.post('/login', userData);
      console.log('Данные отправленные на сервер:', data);

      // Успешная авторизация
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

