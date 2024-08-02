import React, { useState } from "react";
import SecondaryButton from "../Buttons/SecondaryButton";
import MainButton from "../Buttons/MainButton";
import logoMain from "../../assets/images/logoMain.svg";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Para íconos del menú

const NavBarLanding = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="flex flex-col sm:flex-row justify-between items-center p-4  border-b border-gray-300">
            <div className="flex items-center">
                <img src={logoMain} alt="Logo" className="max-h-[60px] sm:max-h-[100px]" />
            </div>

            {/* Menú para pantallas grandes */}
            <div className={`fixed inset-0 bg-customBgMain transition-transform transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} sm:relative sm:translate-x-0 sm:flex sm:items-center sm:gap-5`}>
                <ul className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-5 text-lg font-bold">
                    <li><a href="#inicio" className="hover:text-blue-500">Inicio</a></li>
                    <li><a href="#soluciones" className="hover:text-blue-500">Soluciones</a></li>
                    <li><a href="#analisis-datos" className="hover:text-blue-500">Análisis de Datos</a></li>
                    <li><a href="#clientes" className="hover:text-blue-500">Nuestros Clientes</a></li>
                    <li><a href="#precios" className="hover:text-blue-500">Planes y Precios</a></li>
                </ul>
                {/* Botón de cierre para el menú en móviles */}
                <button className="absolute top-4 right-4 sm:hidden" onClick={toggleMenu}>
                    <AiOutlineClose size={24} />
                </button>
            </div>

            {/* Botón del menú para pantallas pequeñas */}
            <button className="sm:hidden text-lg" onClick={toggleMenu}>
                <AiOutlineMenu size={24} />
            </button>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
                <SecondaryButton children="Ingresar" classNameSize="w-[105px] h-8" />
                <MainButton children="Registrarse" classNameSize="w-[115px] h-8" />
            </div>
        </nav>
    );
};

export default NavBarLanding;
