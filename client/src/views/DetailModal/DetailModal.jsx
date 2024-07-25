import React, { useState } from 'react';
import MainButton from "../../components/Buttons/MainButton";
import MinButton from "../../components/Buttons/MinButton";
import PlusButton from "../../components/Buttons/PlusButton";
import AdditionalInfoFoodTime from '../../components/AdditonalInfoFood/AdditionalInfoFoodTipe';
import AdditionalInfoFoodType from '../../components/AdditonalInfoFood/AdditionalInfoFoodType';
import AdditionalInfoFoodUser from '../../components/AdditonalInfoFood/AdditionalInfoFoodUser';
import Rating from '../../components/Rating/Rating';

const DetailModal = ({ isOpen, onClose, product }) => {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-end justify-center z-50 bg-opacity-50">
            <div className={`w-full max-w-lg mx-auto bg-white border border-customGray-500 rounded-t-3xl shadow-custom-light transform transition-transform duration-500 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className='w-full h-1/3 flex items-center justify-center rounded-t-3xl'>
                    <img src={product.image} alt={product.title} className="object-cover rounded-lg w-full h-full"/>
                </div>
                <div className="flex flex-col w-full h-2/3 bg-white rounded-t-3xl p-6">
                    <h1 className="mt-4 text-2xl font-bold text-customGray-900">{product.title}</h1>
                    <p className="mt-4 text-customGray-500 line-clamp-3">{product.details}</p>
                    <div className="mt-4 flex items-center bg-white space-x-2 text-customRed-300">
                        <AdditionalInfoFoodTime time={product.time} />
                        <AdditionalInfoFoodType />
                        <AdditionalInfoFoodUser />
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                        <span className="text-2xl font-semibold text-customYellow-500"><Rating /></span>
                    </div>
                    <div className="mt-4 ml-4 mb-8 flex items-center space-x-2">
                        <span>Cantidad </span>
                        <MinButton onClick={decreaseQuantity} classNameIcon={"w-4"} />
                        <span>{quantity < 10 ? `0${quantity}` : quantity}</span>
                        <PlusButton onClick={increaseQuantity} classNameIcon={"w-4"} />
                    </div>
                    <div className='mt-auto flex items-center justify-between space-x-2'>
                        <span className="text-2xl font-bold">${product.price}</span>
                        <MainButton
                            children={`Añadir (${quantity})`}
                            classNameSize="h-10 w-32 items-center grow max-w-xs"
                            onClick={() => onClose()} 
                        />
                    </div>
                    <button onClick={onClose} className="mt-4 flex justify-center w-full text-2xl text-gray-500">
                        ˅
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
