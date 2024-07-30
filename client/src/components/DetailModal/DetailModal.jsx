import React, { useState } from 'react';

const DetailModal = ({ isOpen, onClose, product }) => {
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState('');

    if (!isOpen) return null;

    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = () => {
        // Aca se puede manejar la lógica para agregar el producto al carrito
        console.log({
            product,
            quantity,
            note,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 max-w-lg">
                <div className="p-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h2 className="text-xl font-bold">{product.title}</h2>
                        <button className="text-gray-500" onClick={onClose}>
                        &times;
                        </button>
                    </div>
                <div className="p-4">
                    <img src={product.image} alt={product.title} className="w-full h-64 object-cover mb-4 rounded" />
                    <div className="max-h-40 overflow-y-auto mb-4">
                        <p>{product.details}</p>
                    </div>
                <div className="flex items-center mb-4">
                    <button className="bg-customRed text-white px-2 py-1 rounded" onClick={handleDecrease}>-</button>
                    <span className="mx-2">{quantity}</span>
                    <button className="bg-customGreen text-white px-2 py-1 rounded" onClick={handleIncrease}>+</button>
                </div>
                <textarea
                    className="w-full border rounded p-2 mb-4"
                    placeholder="Nota para la cocina"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                ></textarea>
                <button className="bg-customBlue text-white w-full py-2 rounded" onClick={handleAddToCart}>
                    Agregar al carrito
                </button>
            </div>
        </div>
        </div>
    </div>
    );
};

export default DetailModal;
