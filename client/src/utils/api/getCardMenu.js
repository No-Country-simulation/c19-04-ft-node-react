import axiosInstace from "./axiosInstance";

const getCardMenu = async () => {
  try {
    const response = await axiosInstace.get("/api/admin/card-menu/");
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export default getCardMenu;
