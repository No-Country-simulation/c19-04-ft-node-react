import axiosInstance from "./axiosInstance.js";

export async function registerForm(data) {
  try {
    const response = await axiosInstance.post("/api/register", data);

    if (response.status === 201) {
      console.log("Usuario registrado exitosamente"); //usar componente que creo Rocio para los mensajes
      return response.data;
    } else {
      console.error(
        `Error al registrar usuario: ${response.status} - ${response.data}` //usar componente By Rocio
      );
    }
  } catch (error) {
    console.error(`Error al registrar usuario: ${error.message}`);  //usar componente By Rocio DICIENDO QUE HAY UN PROBLEMA CON LA BASE DE DATOS 
    throw error;
  }
}