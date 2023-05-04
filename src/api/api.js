import axios from 'axios';

export async function fetchDsp() {
  try {
    const response = await axios.get('http://localhost:3000/dsp_points');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
