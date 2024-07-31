import axiosInstace from "./axiosInstance";

export const assignClientToTable = async (table, name) => {
    const response = await axiosInstace.post(
        `/api/table/tableQr/joinTable/${table}`,
        {
            name,
        }
    );
    console.log(response);
};
