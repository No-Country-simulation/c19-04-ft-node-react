import MessageRedirect from "../MessageRedirect/MessageRedirect";

const LooutMessageRedirect = () => {
  const messageRedirect = {
    title: "Sesión cerrada",
    message: "La sesión se cerro correctamente, redireccionando a home.",
    path: "/",
  };

  return (
    <div>
      <MessageRedirect
        title={messageRedirect.title}
        message={messageRedirect.message}
        path={messageRedirect.path}
        timeRedirect={3000}
      />
    </div>
  );
};

export default LooutMessageRedirect;
