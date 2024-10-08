import React from "react";
import MessageRedirect from "../MessageRedirect/MessageRedirect";

const InvalidPasswordMessage = () => {
  const messageInvalid = {
    title: "Contraseña Invalida",
    message: "Lo sentimos, la contraseña que has ingresado no es correcta.",
    path: "/login"
  };
  return (
    <div>
      <MessageRedirect
        title={messageInvalid.title}
        message={messageInvalid.message}
        path={messageInvalid.path}
        timeRedirect={3000}
      />
    </div>
  );
};

export default InvalidPasswordMessage;
