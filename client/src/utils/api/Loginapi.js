import axiosInstanceWithCredentials from "./axiosInstanceWithCredentials";

export const login = async (username, password) => {
    try {
        console.log(username, password);
        const response = await axiosInstanceWithCredentials.post(
            "api/auth/login",
            {
                username,
                password,
            }
        );
        const statusCode = response.status;
        let message;

        switch (statusCode) {
            case 200:
                message = "Solicitud procesada exitosamente.";
                break;
            case 201:
                message = "El recurso fue creado exitosamente.";
                break;
            default:
                message = "Operación completada.";
        }

        return { data: true, message };
    } catch (error) {
        if (error.response) {
            throw new Error(
                `La combinacion de Usuario y Contraseña no coincide, intentelo nuevamente.`
            );
        } else {
            throw new Error("Error de red. Inténtalo de nuevo más tarde.");
        }
    }
};
