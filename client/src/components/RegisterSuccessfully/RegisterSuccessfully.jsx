import MessageRedirect from "../MessageRedirect/MessageRedirect";

const RegisterSuccessfully = () => {
  const messageRegister = {
    title: "Registro exitoso",
    message: "Usuario registrado correctamente",
    path: "/admin/register",
  };

  return (
    <div className="bg-customRed-400">
      <MessageRedirect
        title={messageRegister.title}
        message={messageRegister.message}
        path={messageRegister.path}
        timeRedirect={3000}
      />
    </div>
  );
};

export default RegisterSuccessfully;
