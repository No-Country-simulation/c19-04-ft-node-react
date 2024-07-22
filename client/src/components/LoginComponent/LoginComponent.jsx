import React, { useState } from "react";
import { loginAction } from "../../state/store/slices/auth/actionsUser/loginAction";
import { useDispatch, useSelector } from "react-redux";

function LoginComponent() {
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
    });

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(loginAction(loginInfo));
    };

    const handleInputChange = (event) => {
        setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
    };
    return (
        <div className="border border-customRed h-[400px] w-[300px] mx-auto">
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={loginInfo.username}
                    name="username"
                    placeholder="Nombre de usuario"
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    value={loginInfo.password}
                    name="password"
                    placeholder="Contraseña"
                    onChange={handleInputChange}
                />
                <button className="w-max border p-4 mx-auto">
                    INICIAR SESION
                </button>
            </form>
        </div>
    );
}

export default LoginComponent;
