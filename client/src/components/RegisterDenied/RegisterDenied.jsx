import MessageRedirect from "../MessageRedirect/MessageRedirect";

const RegisterDenied = () => {
  const messageRegister = {
    title: "Registro Fallido",
    message: "Usuario ya existente, intentelo nuevamente",
    path: "/admin/register",
  };

  return (
    <div>
      <MessageRedirect
        title={messageRegister.title}
        message={messageRegister.message}
        path={messageRegister.path}
        timeRedirect={3000}
      />
    </div>
  );
};

export default RegisterDenied;
