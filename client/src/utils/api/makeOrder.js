import axiosInstance from "./axiosInstance";

export const makeOrder = async (tableNumber, order) => {
    try {
        const response = await axiosInstance.post("/api/orders/create", {
            tableNumber,
            order,
        });
        return response;
    } catch (error) {
        console.log(error);
        console.log("Error al crear orden");
    }
};
