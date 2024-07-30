import axiosInstanceWithCredentials from "../api/axiosInstanceWithCredentials";

const handleDeleteUser = async (userId) => {
    try {
        await axiosInstanceWithCredentials.delete(
            `/api/admin/deleteUser/${userId}`
        );
    } catch (error) {
        console.log("Error en el servidor");
    }
};

export default handleDeleteUser;
