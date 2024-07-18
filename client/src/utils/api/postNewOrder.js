import axiosInstace from "./axiosInstance";

const postNewOrder = async (data) => {
  try {
    const response = await axiosInstace.post("/api/orders/create", data);
    if (response.status === 201) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export default postNewOrder;
