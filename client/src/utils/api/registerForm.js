import axiosInstanceWithCredentials from "./axiosInstanceWithCredentials.js";

export async function registerForm(data) {
    try {
        const response = await axiosInstanceWithCredentials.post(
            "/api/admin/register",
            data
        );
        if (response.status === 201) {
            return response;
        }
    } catch (error) {
        throw error;
    }
}
