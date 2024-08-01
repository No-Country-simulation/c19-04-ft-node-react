import axiosInstanceWithCredentials from "./axiosInstanceWithCredentials";

export const deleteOrder = async (ordersId) => {
    const promises = ordersId.map((id) =>
        axiosInstanceWithCredentials.delete(`/api//orders/${id}`)
    );
};
