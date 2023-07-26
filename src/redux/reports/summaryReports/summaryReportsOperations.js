import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "constans/urls";


axios.defaults.baseURL = `${API_BASE_URL}`;

export const fetchSummaryReports = createAsyncThunk(
    'summaryReports/fetchSummaryReports',
    async (data, { rejectWithValue }) => {
        console.log('fetchSummaryReports data:', data);

        try {
            const response = await axios.get('/reports/summary', { params: data })
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


export const downloadSummaryReportsCSV = createAsyncThunk(
    "summaryReports/downloadSummaryReportsCSV",
    async (data, { rejectWithValue }) => {
        console.log('Данные в запросе:', data);
        try {
            const response = await axios.post("/reports/download", data, { responseType: "blob" });

            console.log('response в запросе:', response);

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




// export const downloadSummaryReportsCSV = createAsyncThunk(
//     "summaryReports/downloadSummaryReportsCSV",
//     async (data, { rejectWithValue }) => {
//         console.log('Данные в запросе:', data);
//         try {
//             const response = await axios.post("/reports/download", data, { responseType: "arraybuffer" });

//             // Извлекаем имя файла из заголовков ответа
//             const contentDispositionHeader = response.headers["content-disposition"];
//             const fileNameMatch = contentDispositionHeader.match(
//                 /filename[^;=\n]*=(UTF-8(['"]*))?(.*$)/i
//             );
//             const fileName = fileNameMatch ? fileNameMatch[3] : "summary-report.csv";

//             return { fileData: response.data, fileName };
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );
