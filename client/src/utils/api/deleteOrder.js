import axiosInstanceWithCredentials from "./axiosInstanceWithCredentials";

export const deleteOrder = async (ordersId) => {
    const promises = ordersId.map((id) =>
        axiosInstanceWithCredentials.delete(`/api/orders/delete/${id}`)
    );
    console.log(promises);
    const result = await Promise.allSettled(promises);

    console.log(result);
};
