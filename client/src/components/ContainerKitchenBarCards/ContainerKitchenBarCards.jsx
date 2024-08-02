import CardKitchenBar from '../CardKitchBar/CardKitchbar';
import useFireBase from '../../utils/hooks/useFireBase';
import { setOrderInProgress } from '../../utils/api/setOrderInProgress.';
import { setOrderReady } from '../../utils/api/setOrderReady';
import { useEffect, useState } from 'react';
import { transformDataOrdersFirebase } from '../../utils/functions/transformDataOrdersFirebase';
import { useDispatch, useSelector } from 'react-redux';
import { dataMenuGet } from '../../state/store/slices/dataMenu/actionsDataMenu/dataMenuGetAction';

const ContainerKitchenBarCards = () => {
    const [ordersFirebase, setOrdersFireBase] = useFireBase("/orders", {});
    const [inProgressOrders, setInProgressOrders] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [readyOrders, setReadyOrders] = useState([]);

    const dispatch = useDispatch();
    const { menus } = useSelector((state) => state.dataMenus);

    useEffect(() => {
        dispatch(dataMenuGet());
    }, [dispatch]);

    useEffect(() => {
        if (ordersFirebase.inProgress) {
            const transformedInProgressOrders = transformDataOrdersFirebase(ordersFirebase.inProgress);
            setInProgressOrders(transformedInProgressOrders);
        }
        if (ordersFirebase.pending) {
            const transformedPendingOrders = transformDataOrdersFirebase(ordersFirebase.pending);
            setPendingOrders(transformedPendingOrders);
        }
        if (ordersFirebase.ready) {
            const transformedReadyOrders = transformDataOrdersFirebase(ordersFirebase.ready);
            setReadyOrders(transformedReadyOrders);
        }
    }, [ordersFirebase, inProgressOrders, pendingOrders, readyOrders]);

    const groupedPendingOrders = groupOrdersByOrderNumber(pendingOrders);
    const groupedInProgressOrders = groupOrdersByOrderNumber(inProgressOrders);
    const groupedReadyOrders = groupOrdersByOrderNumber(readyOrders);

    const getMenuDetails = (title) => {
        const menu = menus.find((item) => item.title === title);
        return menu ? { image: menu.imgUrl, description: menu.description } : { image: burgerImage, description: "No description available" };
    };

    return (
        <div className="mx-auto gap-8 justify-between flex-col md:flex">
            <div>
                <h2 className="font-bold mb-[10px]">Platos pendientes:</h2>
                <div className='md:flex flex-wrap gap-2 justify-around items-center'>
                    {Object.keys(groupedPendingOrders).map((orderNumber) => (
                        <DropdownGroup
                            key={orderNumber}
                            orderNumber={orderNumber}
                            orders={groupedPendingOrders[orderNumber]}
                            buttonText="Iniciar"
                            buttonAction={setOrderInProgress}
                            backgroundColor="bg-customRed-200"
                            borderColor="border-red-500"
                            buttonColor='bg-red-500'
                            getMenuDetails={getMenuDetails}
                        />
                    ))}
                </div>
            </div>
            <div>
                <h2 className="font-bold mb-[10px]">Órdenes en proceso:</h2>
                <div className='md:flex flex-wrap gap-5 justify-between items-center'>
                    {Object.keys(groupedInProgressOrders).map((orderNumber) => (
                        <DropdownGroup
                            key={orderNumber}
                            orderNumber={orderNumber}
                            orders={groupedInProgressOrders[orderNumber]}
                            buttonText="Terminado"
                            buttonAction={setOrderReady}
                            backgroundColor="bg-customYellow-200"
                            borderColor="border-yellow-500"
                            buttonColor='bg-yellow-500'
                            getMenuDetails={getMenuDetails}
                        />
                    ))}
                </div>
            </div>
            <div>
                <h2 className="font-bold mb-[10px]">Órdenes listas:</h2>
                <div className='md:flex flex-wrap gap-2 justify-around items-center'>
                    {Object.keys(groupedReadyOrders).map((orderNumber) => (
                        <DropdownGroup
                            key={orderNumber}
                            orderNumber={orderNumber}
                            orders={groupedReadyOrders[orderNumber]}
                            buttonText="Servido"
                            buttonAction={() => { }}
                            backgroundColor="bg-customGreen-200"
                            borderColor="border-green-500"
                            buttonColor='bg-green-500'
                            getMenuDetails={getMenuDetails}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const DropdownGroup = ({ orderNumber, orders, buttonText, buttonAction, backgroundColor, borderColor, buttonColor, getMenuDetails }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = (orderId) => {
        buttonAction(orderId);
    };

    return (
        <div className="w-full mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full text-left p-4 ${borderColor} ${backgroundColor} rounded-lg`}
            >
                Número de orden: {orderNumber}
            </button>
            {isOpen && (
                <div className="p-4 flex flex-wrap justify-center items-center gap-2">
                    {orders.map((order, key) => {
                        const { image, description } = getMenuDetails(order.title);
                        return (
                            <CardKitchenBar
                                key={key}
                                backgroundColor={backgroundColor}
                                borderColor={borderColor}
                                buttonColor={buttonColor}
                                buttonText={buttonText}
                                name={order.title}
                                orderNumber={order.orderNumber}
                                image={image}
                                notes={description}
                                quantity={1}
                                status={"Incompleted"}
                                onButtonClick={() => handleButtonClick(order.orderId)}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const groupOrdersByOrderNumber = (orders) => {
    return orders.reduce((acc, order) => {
        const { orderNumber } = order;
        if (!acc[orderNumber]) {
            acc[orderNumber] = [];
        }
        acc[orderNumber].push(order);
        return acc;
    }, {});
};

export default ContainerKitchenBarCards;
