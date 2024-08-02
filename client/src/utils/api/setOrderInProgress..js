import axiosInstanceWithCredentials from "./axiosInstanceWithCredentials";

export const setOrderInProgress = (id) => {
   console.log(id);
    try {
        axiosInstanceWithCredentials.patch(
            `http://localhost:3000/api/orders/update/${id}`,
            {
                updateTo: "inProgress",
            }
        );
    } catch (error) {
        console.log("no se cambio estado de la orden");
    }
};
