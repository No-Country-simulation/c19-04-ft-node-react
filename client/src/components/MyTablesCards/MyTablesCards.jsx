import React, { useState, useEffect } from "react";
import OrderTableCard from "../OrderTableCard/OrderTableCard";
import { setOrderInProgress } from "../../utils/api/setOrderInProgress.";
import { setOrderReady } from "../../utils/api/setOrderReady";
import triangleIconSVG from "../../assets/svg/triangle-inverted.svg";

function MyTablesCards({
    handlerAttend,
    handlerCloseTable,
    tableNumber,
    requested,
    pendingOrders,
    inProgressOrders,
    readyOrders,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const toggleDropdown = () => setIsOpen((prevState) => !prevState);

    useEffect(() => {
        if (isUpdating) {
            const timer = setTimeout(() => {
                setIsUpdating(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isUpdating]);

    const handleOrderUpdate = async (action, orderId) => {
        setIsUpdating(true);
        await action(orderId);
    };

    return (
        <div
            className={`bg-white min-h-max text-sm shadow-lg rounded-lg transition-[border-radius] px-2 mb-2 md:max-w-3xl md:mx-auto ${
                isOpen ? " duration-0" : "duration-1000"
            }`}
        >
            <div className="p-2 flex flex-col md:flex-row justify-between items-center font-semibold border-b-2">
                <div className="flex gap-2 mb-2 md:mb-0">
                    <h2 className="text-lg md:text-xl">Mesa {tableNumber}</h2>
                    <button onClick={toggleDropdown}>
                        <img
                            src={triangleIconSVG}
                            alt="Toggle"
                            className={`w-3 h-3 transform transition-transform duration-500 ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                    {requested && (
                        <div className="py-1 px-2 border border-transparent text-xl">
                            🙋
                        </div>
                    )}
                    {requested && (
                        <button
                            className="box-border px-3 py-2 rounded-lg text-white font-bold shadow-md bg-customRed-400 hover:bg-red-500 active:bg-red-600 text-sm md:text-base"
                            onClick={handlerAttend}
                            value={tableNumber}
                        >
                            Atender llamado
                        </button>
                    )}
                    <button
                        className="box-border px-3 py-2 rounded-lg text-white font-bold shadow-md bg-customRed-400 hover:bg-red-500 active:bg-red-600 text-sm md:text-base"
                        onClick={handlerCloseTable}
                        value={tableNumber}
                    >
                        Cerrar mesa
                    </button>
                </div>
            </div>
            <div
                className={`transition-all duration-500 ${
                    isOpen ? "max-h-fit my-4 pb-2" : "max-h-0 overflow-hidden"
                }`}
            >
                <div className="md:grid md:grid-cols-3 md:gap-4">
                    {isUpdating ? (
                        <div className="col-span-3 flex justify-center items-center h-32">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-customRed-400"></div>
                        </div>
                    ) : (
                        <>
                            {pendingOrders &&
                            pendingOrders.filter(
                                (order) => order.tableNumber === tableNumber
                            ).length ? (
                                <OrderTableCard
                                    array={pendingOrders}
                                    type="Ordenes pendientes"
                                    color="red"
                                    tableNumber={tableNumber}
                                    action={(orderId) =>
                                        handleOrderUpdate(
                                            setOrderInProgress,
                                            orderId
                                        )
                                    }
                                    actionDisplay="MARCAR EN PROGRESO"
                                />
                            ) : null}
                            {inProgressOrders &&
                            inProgressOrders.filter(
                                (order) => order.tableNumber === tableNumber
                            ).length ? (
                                <OrderTableCard
                                    array={inProgressOrders}
                                    type="Ordenes en progreso"
                                    color="yellow"
                                    tableNumber={tableNumber}
                                    action={(orderId) =>
                                        handleOrderUpdate(
                                            setOrderReady,
                                            orderId
                                        )
                                    }
                                    actionDisplay="MARCAR ORDEN LISTA"
                                />
                            ) : null}
                            {readyOrders &&
                            readyOrders.filter(
                                (order) => order.tableNumber === tableNumber
                            ).length ? (
                                <OrderTableCard
                                    array={readyOrders}
                                    type="Ordenes listas"
                                    color="green"
                                    tableNumber={tableNumber}
                                />
                            ) : null}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyTablesCards;
