import MessageRedirect from "../../components/MessageRedirect/MessageRedirect";
import axiosInstance from "./axiosInstance.js";

export async function messageRegister(data) {
  try {
    const response = await axiosInstance.post("/api/register", data);

    if (response.status === 201) {
      console.log("Usuario registrado exitosamente"); //usar componente que creo Rocio para los mensajes

      const messageRegister = {
        title: "Registro exitoso",
        message: "Usuario registrado correctamente",
        path: "/login",
      };

      return (
        <div>
          <MessageRedirect
            title={messageRegister.title}
            message={messageRegister.message}
            path={messageRegister.path}
          />
        </div>
      );
      // return (response.data);
    } else {
      console.error(
        `Error al registrar usuario: ${response.status} - ${response.data}` //usar componente By Rocio
      );
    }
  } catch (error) {
    console.error(`Error al registrar usuario: ${error.message}`); //usar componente By Rocio DICIENDO QUE HAY UN PROBLEMA CON LA BASE DE DATOS
    throw error;
  }
}
