import axiosInstance from "./axiosInstance.js";

export async function registerForm(data) {
  try {
    const response = await axiosInstance.post("/api/auth/register", data);
    if (response.status === 201) {
      console.log(response)
      return response;
    }
  } catch (error) {
    console.log(error)
    throw error;
  }
}
