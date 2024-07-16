import MessageRedirect from "../MessageRedirect/MessageRedirect";

const RegisterDenied = () => {
  const messageRegister = {
    title: "Registro Fallido",
    message: "Error en el registro, pongase en contacto con el proveedor ",
    path: "/Login",
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
};

export default RegisterDenied;
