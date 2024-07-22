// src/utils/api.js
import axiosInstace from "./axiosInstance";

export const login = async (username, password) => {
    try {
        const response = await axiosInstace.post("api/auth/login", {
            username,
            password
        });
        const statusCode = response.status;
        let message;

        switch (statusCode) {
            case 200:
                message = 'Solicitud procesada exitosamente.';
                break;
            case 201:
                message = 'El recurso fue creado exitosamente.';
                break;
            default:
                message = 'Operación completada.';
        }

        return { data: response.data, message };
        
    } catch (error) {
        console.log( "loginapi")
        if (error.response) {
            throw new Error(`Error ${error.response.status}: ${error.response.data.message}`);
        } else {
            throw new Error('Error de red. Inténtalo de nuevo más tarde.');
        }
    }
};
