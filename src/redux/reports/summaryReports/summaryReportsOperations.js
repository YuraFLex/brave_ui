import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';
import { API_BASE_URL } from "constans/urls";


axios.defaults.baseURL = `${API_BASE_URL}`;

export const fetchSummaryReports = createAsyncThunk(
    'summaryReports/fetchSummaryReports',
    async (summaryData, { rejectWithValue }) => {

        try {
            const { data } = await await axios.get('/reports/summary', { params: summaryData })

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
            return data
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


export const downloadSummaryReportsCSV = createAsyncThunk(
    "summaryReports/downloadSummaryReportsCSV",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post("/reports/download", data, { responseType: "blob" });

            // console.log('response в запросе:', response);

            let fileName = "reports.csv";

            const blob = new Blob([response.data], { type: 'text/csv' });
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.setAttribute("download", fileName);

            // Симулируем клик по ссылке для скачивания файла
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            return response.data;
        } catch (error) {
            console.error('Error while downloading:', error);
            return rejectWithValue("Failed to download the file.");
        }
    }
);
