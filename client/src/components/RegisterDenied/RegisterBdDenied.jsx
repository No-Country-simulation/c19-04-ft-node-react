import MessageRedirect from "../MessageRedirect/MessageRedirect";

const RegisterDeniedBD = () => {
    const messageRegister = {
        title: "Problemas con el Servidor",
        message: "Error con la base de datos, comuniquese con su proveedor",
        path: "/admin",
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

export default RegisterDeniedBD;
