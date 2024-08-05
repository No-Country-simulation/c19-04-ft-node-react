import axiosInstace from "../api/axiosInstance";

async function callWaiter(table) {
    try {
        const response = await axiosInstace.patch(
            `/api/waiter/callWaiter/${table}`
        );
        if (response.status === 200) {
            console.log("un mesero va en camino");
        }
    } catch (error) {
        if (error.response.status === 403) {
            return console.log("ya hay un mesero en camino");
        }
        console.log(error.response.data.message);
    }
}

export default callWaiter;
