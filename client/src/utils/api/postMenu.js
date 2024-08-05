import axiosInstace from "./axiosInstance";

const postMenu = async (data) => {
  try {
    const response = await axiosInstace.post("/api/admin/menu", data);

    if (response.status === 201) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export default postMenu;
