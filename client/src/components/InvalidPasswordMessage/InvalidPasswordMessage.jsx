import React from "react";
import { redirectLogin } from "../../utils/functions/redirectLogin";


const InvalidPasswordMessage = () => {

  redirectLogin('/login', 5000);
  
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-lg mx-5">
            <h2 className="text-xl font-bold mb-5">Contraseña invalida</h2>
            <p>Por favor vuelva a ingresar una contraseña valida, Redirigiendo al inicio de sesión...</p>
          </div>
        </div>
    )
}

export default InvalidPasswordMessage;