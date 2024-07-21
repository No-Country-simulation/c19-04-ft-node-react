import axiosInstace from "./axiosInstance";

const postIngredients = async (data) => {
  try {
    const response = await axiosInstace.post("/api/admin/ingredients");

    if (response.status === 201) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export default postIngredients;
