import axiosInstanceWithCredentials from "./axiosInstanceWithCredentials";

export const closeTable = async (table, order = ["sin_pedido"]) => {
    try {
        const response = await axiosInstanceWithCredentials.post(
            `/api/waiters/closeTable/${table}`,
            { order }
        );
    } catch (error) {
        console.log(error);
        console.log("No se pudo cerrar la mesa");
    }
};
