import axiosInstace from "./axiosInstance";

export const assignClientToTable = async (table, name) => {
    try {
        const response = await axiosInstace.post(
            `/api/table/tableQr/joinTable/${table}`,
            {
                name,
            }
        );
    } catch (error) {
        console.log("Error al asignar mesas");
    }
};
