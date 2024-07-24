import axiosInstanceWithCredentials from "./axiosInstanceWithCredentials";

export const assignTable = async (tables, user) => {
    try {
        const response = await axiosInstanceWithCredentials.patch(
            `/api/admin/assignTables/${user}`,
            { tables }
        );
        return response;
    } catch (error) {
        console.log("Error al asignar mesas");
    }
};
