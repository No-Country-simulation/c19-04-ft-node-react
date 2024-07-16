import axiosInstance from "./axiosInstance.js";

export async function registerForm(data) {
  try {
    const response = await axiosInstance.post("/api/register", data);
    if (response.status === 201) {
      return response;
    }
  } catch (error) {
    throw error;
  }
}
