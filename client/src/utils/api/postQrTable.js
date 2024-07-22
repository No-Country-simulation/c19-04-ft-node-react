import axiosInstace from "./axiosInstance";

const postQrTable = async (tableData) => {
  try {
    const response = await axiosInstace.post("api/table/tableQR", tableData);
    if (response.status === 201) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export default postQrTable;
