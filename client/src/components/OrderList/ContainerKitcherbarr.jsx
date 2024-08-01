import React from 'react';
import OrderCard from '../KitchenBar/OrderCard';
import burgerImage from "../../assets/images/imgHamburgesa.png"; // Asegúrate de poner la ruta correcta de la imagen


const orders = [
    {
        orderNumber: 559,
        image: burgerImage,
        quantity: 5,
        name: 'Gran Wilde',
        notes: 'Notas: algunas notas relevantes de parte del comensal',
        status: 'pending',
        buttonText: 'Iniciar',
        buttonColor: 'bg-red-500',
        borderColor: 'border-red-500',
        backgroundColor: 'bg-customRed-200'
    },
    {
        orderNumber: 558,
        image: burgerImage,
        quantity: 5,
        name: 'Gran Wilde',
        notes: 'Notas: algunas notas relevantes de parte del comensal',
        status: 'inProgress',
        buttonText: 'Terminado',
        buttonColor: 'bg-red-500',
        borderColor: 'border-blue-500',
        backgroundColor: 'bg-customBlue-200'
    },
    {
        orderNumber: 557,
        image: burgerImage,
        quantity: 5,
        name: 'Gran Wilde',
        notes: 'Notas: algunas notas relevantes de parte del comensal',
        status: 'completed',
        buttonText: 'Solicitar mozo',
        buttonColor: 'bg-red-500',
        borderColor: 'border-green-500',
        backgroundColor: 'bg-customGreen-200'
    }
];

const OrderList = () => {
    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Cocina / Bar</h1>
            <div>
                <h2 className="text-xl font-semibold mb-2">Platos pendientes:</h2>
                {orders.filter(order => order.status === 'pending').map(order => (
                    <OrderCard key={order.orderNumber} {...order} />
                ))}
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-2">Órdenes en proceso:</h2>
                {orders.filter(order => order.status === 'inProgress').map(order => (
                    <OrderCard key={order.orderNumber} {...order} />
                ))}
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-2">Órdenes listas:</h2>
                {orders.filter(order => order.status === 'completed').map(order => (
                    <OrderCard key={order.orderNumber} {...order} />
                ))}
            </div>
        </div>
    );
};

export default OrderList;