import axiosInstanceWithCredentials from "./axiosInstanceWithCredentials";

export const setOrderReady = async (id) => {
    // console.log(id);
    try {
        axiosInstanceWithCredentials.patch(
            `http://localhost:3000/api/orders/update/${id}`,
            {
                updateTo: "ready",
            }
        );
    } catch (error) {
        console.log("no se cambio estado de la orden");
    }
};
