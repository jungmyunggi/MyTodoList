import axios from "axios";
import { baseUrl } from "./baseUrl";

export const fetchSchedule = async (date) => {
  try {
    const response = await axios.get(`${baseUrl}/api/getschedule?date=${date}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addSchedule = async (newSchedule) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/addschedule`,
      newSchedule
    );
    return response.status;
  } catch (error) {
    throw error;
  }
};
