import React, { useState } from 'react';
import MainButton from '../Buttons/MainButton';
import SecondaryButton from '../Buttons/SecondaryButton';

const PopupCartPostOrder = ({ isOpen, onClose }) => {
    const admin = {
        name: "Marcos"
    }

    return (
        
        <div className={`absolute top-0 h-screen w-screen bg-black bg-opacity-50 backdrop-filter backdrop-blur-md ${isOpen ? 'block' : 'hidden'}`}>
            <div className="fixed p-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[180px] shadow-custom-light bg-white border rounded-[20px] flex items-center justify-center ">
                <div className='flex flex-col gap-4'>
                    <div className='h-full'>
                        <p className='text-center'>{admin.name} se encargará de realizar el pedido grupal.</p>
                        <p className='text-center'>¿Quieres pedir solo o esperar a que los demás estén listos?</p>
                    </div>
                    <div className='flex gap-5 justify-between'>
                        <SecondaryButton children="Pedir solo" classNameSize="grow h-[40px]" />
                        <MainButton children="Esperar" classNameSize="grow h-[40px]" onClick={onClose} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopupCartPostOrder;
