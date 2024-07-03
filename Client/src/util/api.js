import axios from 'axios';
import { baseUrl } from './baseUrl';

export const fetchSchedule = async (date) => {
  try {
    const response = await axios.get(`${baseUrl}/api/schedule`, {
      params: { date }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch schedule', error);
    throw error;
  }
};
