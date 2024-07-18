import axiosInstace from "./axiosInstance";

const getAllIngredients = async () => {
  try {
    const response = await axiosInstace.get("/api/admin/ingredients");

    if(response.status === 200) {
      return response;
    }
  } catch (error) {
    throw error;
  }
}

export default getAllIngredients
