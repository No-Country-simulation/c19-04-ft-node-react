import axiosInstance from "./axiosInstance.js";

export async function searchMenu(value) {
  try {
    const response = await axiosInstance.get(`/api/menu?q=${value}`,);
    if (response.status === 201) {
      return response;
    }
  } catch (error) {
    throw error;
  }
}