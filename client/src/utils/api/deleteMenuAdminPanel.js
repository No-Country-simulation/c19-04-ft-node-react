import axiosInstanceWithCredentials from "./axiosInstanceWithCredentials";
export const deleteMenuAdmin = async (_id) => {
  try {
    await axiosInstanceWithCredentials.delete(
      `/api/admin/menu/delete/${_id}`
    );
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message:
        "No se pudo Eliminar el menú. Por favor, inténtelo de nuevo más tarde.",
    };
  }
};
