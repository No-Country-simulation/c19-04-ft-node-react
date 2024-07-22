import axiosInstace from "./axiosInstance";

const deleteIngredients = async (nameIngredients) => {
  try {
    const response = await axiosInstace.delete(`/api/admin/ingredients/${nameIngredients}`);

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export default deleteIngredients;
