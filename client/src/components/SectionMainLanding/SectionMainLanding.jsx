import React, { useState } from "react";
import imageLanding from "../../assets/images/imageLanding.png";
import MainButton from "../../components/Buttons/MainButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/api/Loginapi";
import "../../styles/animation.css";
import ErrorPopup from "../PopupIndicator/ErrorPopup";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../state/store/slices/auth/actionsUser/fetchUser";

const SectionMainLanding = () => {
    const WAITER_NAME = import.meta.env.VITE_WAITER_NAME;
    const WAITER_PASSWORD = import.meta.env.VITE_WAITER_PASSWORD;

    const [error, setError] = useState(false);

    const dispatch = useDispatch();

    const [showMessageBox, setShowMessageBox] = useState(false);
    const navigate = useNavigate();
    const handleDemo = async () => {
        try {
            await login(WAITER_NAME, WAITER_PASSWORD);
            dispatch(fetchUser());
            const width = 430; // Ancho deseado en píxeles
            const height = 932; // Alto deseado en píxeles
            const totalWidth = width * 2; // Ancho total para ambas ventanas
            const left = (window.screen.width - totalWidth) / 2;
            const top = (window.screen.height - height) / 2;

            window.open(
                "/menu/1",
                "_blank",
                `width=${width},height=${height},left=${left},top=${top}`
            );
            navigate("/waiter");
        } catch (error) {
            setError(true);
        }
    };

    const handleShowMessageBox = () => {
        setShowMessageBox(!showMessageBox);
    };

    return (
        <div className="flex-col flex flex-grow justify-between items-center mt-2 gap-2 sm:flex-row">
            <div className="mt-10 max-w-screen-md">
                <h1 className="text-2xl font-bold break-words sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-5">
                    Gestioná tu negocio de manera eficiente y en tiempo real
                </h1>
                <p className="text-[14px] break-words sm:text-[18px] md:text-[22px] lg:text-[26px] leading-8">
                    Nuestro servicio es tu mejor herramienta para administrar tu
                    negocio y aumentar tus rendimientos
                </p>

                <div className="flex gap-3 mt-12">
                    <MainButton
                        children="Empezá Ahora"
                        classNameSize="h-[40px] w-[136px]"
                    />
                    <SecondaryButton
                        children="Modo Demo"
                        classNameSize="w-[116px]"
                        onClick={handleShowMessageBox}
                    />
                </div>
            </div>
            <div className="max-w-[100%] max-h-[100%] min-w-[40%] flex-grow flex justify-center items-center">
                <img
                    src={imageLanding}
                    alt="imageLanding"
                    className="rounded-[75px] object-cover"
                />
            </div>
            <div
                className={`fixed inset-0 flex items-center justify-center backdrop-blur bg-black bg-opacity-50 ${
                    showMessageBox ? "blur-in" : "blur-out"
                }`}
            >
                <div
                    className={`p-4 w-[380px] rounded-[12px] flex flex-col items-center justify-center bg-slate-50 ${
                        showMessageBox ? "zoom-in" : "zoom-out"
                    }`}
                >
                    <div className="text-center p-4 mb-2">
                        Estás a punto de ingresar al modo demo. A continuación,
                        se abrirá una pestaña en la cual estará la vista del
                        menú. En ella, podrás seleccionar los platillos a
                        comprar, realizar órdenes y llamar a los meseros. En la
                        ventana actual, habrás iniciado sesión como un mesero, y
                        podrás atender a las personas de la mesa.
                    </div>

                    <div className="flex flex-col gap-6">
                        <MainButton
                            type="button"
                            children="Ingresar al modo demo"
                            className="py-1 px-4"
                            onClick={handleDemo}
                        />
                        <SecondaryButton
                            type="button"
                            children="Cancelar"
                            className="py-1 px-4"
                            onClick={handleShowMessageBox}
                        />
                    </div>
                </div>
            </div>
            {error && <ErrorPopup message={"Error al iniciar sesión"} />}
        </div>
    );
};

export default SectionMainLanding;
