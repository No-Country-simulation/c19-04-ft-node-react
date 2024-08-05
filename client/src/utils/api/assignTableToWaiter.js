import axiosInstanceWithCredentials from "./axiosInstanceWithCredentials";

export const assignTableToWaiter = async (table, waiter) => {
    try {
        const response = await axiosInstanceWithCredentials.post(
            `/api/table/assignWaiter/${table}`,
            { waiter }
        );
        return response;
    } catch (error) {
        console.log(error);
        console.log("Error al asignar mesas");
    }
};
