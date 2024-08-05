import axiosInstace from "./axiosInstance";

const patchCallWaiter = async (table, waiter) => {
    try {
        const response = await axiosInstace.post(
            `/api/waiters/requestWaiter/${waiter}`,
            {
                requestedBy: `Table ${table}`,
            }
        );
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        throw error;
    }
};

export default patchCallWaiter;
