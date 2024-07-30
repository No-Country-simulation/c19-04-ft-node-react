import axiosInstanceWithCredentials from "./axiosInstanceWithCredentials";
export const updateMenuAdmin = async (updatedMenu) => {
  try {
    await axiosInstanceWithCredentials.patch(
      `/api/admin/menu/${updatedMenu._id}`,
      updatedMenu
    );
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message:
        "No se pudo crear el menú. Por favor, inténtelo de nuevo más tarde.",
    };
  }
};
