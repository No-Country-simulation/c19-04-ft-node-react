import React, { useState } from 'react';
import MainButton from "../../components/Buttons/MainButton";
import MinButton from "../../components/Buttons/MinButton";
import PlusButton from "../../components/Buttons/PlusButton";
import clockIconSVG from "../../assets/svg/clock.svg";

const DetailModal = ({ isOpen, onClose, product }) => {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    if (!isOpen) return null;

    return (
        <div className="inset-0 flex items-center justify-center border-customGray-200 z-50">
            <div className="bg-white rounded-t-3xl p-6 shadow-custom-light w-full max-w-lg mx-auto relative">
                <div className='bg-customYellow-400 rounded-t-3xl items-center justify-center'>
                    <img src={product.image} alt={product.title} className="w-64 h-64 rounded-lg object-cover "/>
                    <div className="flex flex-col bg-white rounded-t-3xl p-6">
                        <h1 className="mt-4 text-2xl font-900 text-customGray-900">{product.title}</h1>
                        <p className="mt-4 text-customGray-500 line-clamp-3">{product.details}</p>
                        <div className="mt-4 flex items-center bg-white space-x-2 text-customRed-300">
                            <span className="w-230 h-25" classNameIcon={"clockIconSVG"}>{product.time}</span>
                            <span className="w-230 h-25">{product.servings}</span>
                            <span className="w-230 h-25">{product.type}</span>
                        </div>
                        <div className="mt-2 flex items-center space-x-2">
                            <span className="text-xl font-semibold text-customYellow-500">{product.rating} ★★★★</span>
                        </div>
                        <div className="mt-4 flex items-center space-x-2">
                            Cantidad 
                            <MinButton
                                onClick={decreaseQuantity}
                                classNameIcon={"w-4"}
                            />
                            <span>{quantity < 10 ? `0${quantity}` : quantity}</span>
                            <PlusButton
                                onClick={increaseQuantity}
                                classNameIcon={"w-4"}
                            />
                        </div>
                        <div className='mt-auto flex items-center justify-between space-x-2'>
                            <span className="text-2xl font-900">${product.price}</span>
                            <MainButton
                                children={`Añadir (${quantity})`}
                                classNameSize="h-10 w-32 items-center grow"
                                onClick={() => onClose()} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
