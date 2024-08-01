import React from 'react';
import SecondaryButton from '../Buttons/SecondaryButton';
import MainButton from '../Buttons/MainButton';

const NavBarLanding = () => {
    return (
        <nav className='flex justify-between pb-2 border-b border-black'>
            <div>
                <h2 className='font-bold text-[28px] text-center '>Nuestro Logo</h2>
            </div>
            <div className='flex items-center font-bold text-sm tracking-tighter'>
                <ul className='flex justify-center items-center gap-5'>
                    <li><a href="#inicio">Inicio</a></li>
                    <li><a href="#soluciones">Soluciones</a></li>
                    <li><a href="#analisis-datos">Análisis de Datos</a></li>
                    <li><a href="#clientes">Nuestros Clientes</a></li>
                    <li><a href="#precios">Planes y Precios</a></li>
                </ul>
            </div>
            <div className='flex items-center gap-[5px]'>
                <SecondaryButton children="Ingresar" classNameSize="w-[105px] h-8" />
                <MainButton children="Registrarse" classNameSize="w-[115px] h-8" />
            </div>
        </nav>
    );
}

export default NavBarLanding;
