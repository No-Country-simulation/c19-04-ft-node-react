import axiosInstace from "./axiosInstance";

const getAllMenu = async () => {
  try {
    const response = await axiosInstace.get("/api/admin/menu");
    
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export default getAllMenu;
