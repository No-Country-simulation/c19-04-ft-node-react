import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstanceWithCredentials = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Incluye cookies en las solicitudes
});

export default axiosInstanceWithCredentials;
