import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from '../../constans/urls';

axios.defaults.baseURL = `${API_BASE_URL}`;

export const changePassword = createAsyncThunk(
    'changePassword/changePassword',
    async (passwordData, { rejectWithValue }) => {
        console.log('Данные на сервер:', passwordData);
        try {
            const response = await axios.put(`/changepassword`, passwordData);
            console.log('Данные отправленные на сервер', response.data);

            // Проверка статуса ответа сервера
            if (response.status === 200) {
                // Уведомление об успешном изменении пароля
                toast.success(response.data.message);
                return response.data;
            } else if (response.status === 400 && response.data.error) {
                // Уведомление об ошибке с сервера
                const { message } = response.data.error;
                toast.error(message);
                return rejectWithValue(message);
            } else {
                // Уведомление об общей ошибке сервера
                toast.error('An error occurred while changing the password');
                return rejectWithValue('An error occurred while changing the password');
            }
        } catch (error) {
            // Уведомление об ошибке
            toast.error(error.message);
            return rejectWithValue(error.message);
        }
    }
);





