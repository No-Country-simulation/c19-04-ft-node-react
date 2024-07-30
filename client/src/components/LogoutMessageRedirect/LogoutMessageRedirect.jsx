import MessageRedirect from "../MessageRedirect/MessageRedirect";

const LogoutMessageRedirect = () => {
  const messageRedirect = {
    title: "Sesión cerrada",
    message: "Has cerrado sesión exitosamente, redireccionando a home.",
    path: "/"
  };

  return (
    <div className="absolute flex items-center justify-center inset-0">
      <MessageRedirect
        title={messageRedirect.title}
        message={messageRedirect.message}
        path={messageRedirect.path}
        timeRedirect={3000}
      />
    </div>
  );
};

export default LogoutMessageRedirect;
