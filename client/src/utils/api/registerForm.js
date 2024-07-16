import axiosInstance from "./axiosInstance.js";


export async function registerForm(data) {
  try {
    const response = await axiosInstance.post("/api/register", data);
    if (response.status === 201) {      
      return response
    }
  } catch (error) {
    console.error(`Error al registrar usuario servidor: ${error}`);  //usar componente By Rocio DICIENDO QUE HAY UN PROBLEMA CON LA BASE DE DATOS 
    return error
  }
}