import axiosInstance from "./axiosInstance.js";

export async function registerForm(data) {
  try {
    const response = await axiosInstance.post("/api/register", data);

    if (response.status === 201) {
      console.log("Usuario registrado exitosamente");
      return response.data;
    } else {
      console.error(
        `Error al registrar usuario: ${response.status} - ${response.data}`
      );
      throw new Error(
        `Error al registrar usuario: ${response.status} - ${response.data}`
      );
    }
  } catch (error) {
    console.error(`Error al registrar usuario: ${error.message}`);
    throw error;
  }
}
