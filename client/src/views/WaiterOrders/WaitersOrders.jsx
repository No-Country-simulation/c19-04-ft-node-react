import React from 'react';
import DropdownWaiterOrders from '../../components/Dropdown/DropdownWaiterOrders';
import MainButton from '../../components/Buttons/MainButton';

const WaitersOrders = () => {

    const mockOrdersForWaiter = [
        {
            _id: "11",
            table: 1,
            products: 10,
            peoplesInTable: 6,
            totalpay: 48000
        },
        {
            _id: "12",
            table: 4,
            products: 10,
            peoplesInTable: 6,
            totalpay: 48000
        },
        {
            _id: "13",
            table: 2,
            products: 10,
            peoplesInTable: 6,
            totalpay: 48000
        },
        {
            _id: "14",
            table: 3,
            products: 10,
            peoplesInTable: 6,
            totalpay: 48000
        },
    ];

    const waiter = {
        name: "Juan",
        notifications: ["table 1", "table 4", "kitchen", "bar"]
    }

    return (
        <div>
            <div className="flex flex-col items-center w-full p-5 gap-2 grow bg-customBgMain min-h-screen">
                <div>
                    <h2 className='font-semibold'> ¡Hola {waiter.name}!</h2>
                </div>

                <div className='self-start'>
                    <h3 className='font-bold text-lg text'>
                        Te necesitan en:
                    </h3>
                    {waiter.notifications.length > 0 ? (
                        <ul className="list-disc pl-5">
                            {waiter.notifications.map((notification, index) => (
                                <li key={index} className="font-medium capitalize" >
                                    {notification}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay notificaciones.</p>
                    )}
                </div>

                <div className='flex flex-col gap-2'>

                    {mockOrdersForWaiter.map((order) => (
                        <DropdownWaiterOrders
                            key={order._id}
                            id={order._id}
                            table={order.table}
                            products={order.products}
                            peoplesInTable={order.peoplesInTable}
                            totalpay={order.totalpay}
                        />
                    ))}
                </div>

                <div className='w-full flex items-end grow'>
                    <MainButton children="Crear orden" classNameSize="w-full h-[40px]" />
                </div>
            </div>
        </div>
    );
};

export default WaitersOrders;
