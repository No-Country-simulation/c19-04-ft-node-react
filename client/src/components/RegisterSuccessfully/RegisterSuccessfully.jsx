import MessageRedirect from "../MessageRedirect/MessageRedirect";

const RegisterSuccessfully = () => {
  const messageRegister = {
    title: "Registro exitoso",
    message: "Usuario registrado correctamente",
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

export default RegisterSuccessfully;
