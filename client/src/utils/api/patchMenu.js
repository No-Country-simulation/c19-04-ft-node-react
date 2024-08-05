import axiosInstace from "./axiosInstance";

const patchMenu = async (id, updateData) => {
  try {
    const response = await axiosInstace.patch(`/api/admin/${id}`, updateData);

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export default patchMenu;
