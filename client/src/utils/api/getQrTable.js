import axiosInstace from "./axiosInstance";

const getQrTable = async(numberTable) => {
  try {
    const response = await axiosInstace.get(`/api/table/tableQR/${numberTable}`);
    
    if(response === 200) {
      return response;
    }
  } catch (error) {
    throw error;
  }
}

export default getQrTable
