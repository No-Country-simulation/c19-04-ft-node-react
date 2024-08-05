import axiosInstanceWithCredentials from "./axiosInstanceWithCredentials"
export const getMenusForAdminPanel =  async (setMenus, setError) => {
    try {
        const response = await axiosInstanceWithCredentials.get("/api/admin/menu/");
        setMenus(response.data);
        setError("");
    } catch (error) {
        setError("No se puede acceder a la base de datos. Por favor, inténtelo de nuevo más tarde.");
    }
};