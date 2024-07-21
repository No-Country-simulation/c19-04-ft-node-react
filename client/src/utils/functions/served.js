import axiosInstace from "../api/axiosInstance";

async function served(table) {
    try {
        const response = await axiosInstace.delete(
            `/api/waiter/deleteMsg/${table}`
        );

        if (response.status === 200) {
            console.log("ha sido atendido");
        }
    } catch (error) {
        console.log(error);
        console.log(error.response.data.message);
    }
}

export default served;
