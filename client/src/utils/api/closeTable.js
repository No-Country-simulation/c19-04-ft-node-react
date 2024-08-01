import axiosInstanceWithCredentials from "./axiosInstanceWithCredentials";

export const closeTable = async (table, order) => {
    try {
        const response = await axiosInstanceWithCredentials.post(
            `/api/waiters/closeTable/${table}`,
            { order }
        );
        return response;
    } catch (error) {
        console.log(error);
        console.log("No se pudo cerrar la mesa");
    }
};
