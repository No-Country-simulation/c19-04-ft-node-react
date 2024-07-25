import axiosInstace from "./axiosInstance";

const patchCallWaiter = async (tableNumber) => {
  try {
    const response = await axiosInstace.patch(`/api/waiter/callWaiter/${tableNumber}`);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    throw error
  }
}

export default patchCallWaiter
