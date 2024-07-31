import React, { useState } from 'react';
import MainButton from '../Buttons/MainButton';
import SecondaryButton from '../Buttons/SecondaryButton';

const PopupCartPostOrder = () => {
    const admin = {
        name: "Marcos"
    }
    const [isOpen, setIsopen] = useState(true); // esto para ocultar el modal con el boton esperar

    return (
        <div className={`fixed p-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[180px] shadow-custom-light bg-white bg-opacity-90 backdrop-blur-xl border rounded-[20px] items-center justify-center ${isOpen ? 'flex' : 'hidden'}`}>
            <div className='flex flex-col gap-4'>
                <div className='h-full'>
                    <p className='text-center'>{admin.name} se encargará de realizar el pedido grupal.</p>
                    <p className='text-center'>¿Quieres pedir solo o esperar a que los demás estén listos?</p>
                </div>
                <div className='flex gap-5 justify-between'>
                    <SecondaryButton children="Pedir solo" classNameSize="grow h-[40px]" />
                    <MainButton children="Esperar" classNameSize="grow h-[40px]"  onClick={() => setIsopen(!isOpen)}/>
                </div>
            </div>
        </div>
    );
}

export default PopupCartPostOrder;
