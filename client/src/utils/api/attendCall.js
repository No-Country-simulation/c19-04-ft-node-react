import axiosInstanceWithCredentials from "./axiosInstanceWithCredentials";

export const attendCall = async (table, waiter) => {
    try {
        const response = await axiosInstanceWithCredentials.post(
            `/api/waiters/attendRequest/${waiter}`,
            { requestAttended: `Table ${table}` }
        );
    } catch (error) {
        console.log("No se pudo atender el llamado");
    }
};
