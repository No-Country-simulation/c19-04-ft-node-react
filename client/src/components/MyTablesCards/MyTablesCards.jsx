import React from "react";
import OrderTableCard from "../OrderTableCard/OrderTableCard";
import { setOrderInProgress } from "../../utils/api/setOrderInProgress.";
import { setOrderReady } from "../../utils/api/setOrderReady";
import triangleIconSVG from "../../assets/svg/triangle-inverted.svg";

import { useState } from "react";

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
    const toggleDropdown = () => setIsOpen((prevState) => !prevState);

    return (
        <div
            className={`bg-white min-h-max text-sm shadow-lg rounded-lg transition-[border-radius] px-2 mb-2 ${
                isOpen ? " duration-0" : "duration-1000"
            }`}
        >
            <div className="p-2 flex justify-between items-center font-semibold border-b-2">
                <div className="flex gap-2">
                    <h2>Mesa {tableNumber}</h2>
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
                <div className="flex gap-2 content-baseline">
                    {requested && (
                        <div className="py-1 px-2 border border-transparent">
                            🙋
                        </div>
                    )}{" "}
                    {requested && (
                        <button
                            className="box-border px-2 py-1 rounded-lg text-white font-bold shadow-md bg-customRed-400 hover:bg-red-500 active:bg-red-600"
                            onClick={handlerAttend}
                            value={tableNumber}
                        >
                            Atender llamado
                        </button>
                    )}
                    <button
                        className="box-border px-2 py-1 rounded-lg text-white font-bold shadow-md bg-customRed-400 hover:bg-red-500 active:bg-red-600"
                        onClick={handlerCloseTable}
                        value={tableNumber}
                    >
                        Cerrar mesa
                    </button>
                </div>
            </div>
            <div
                className={`transition-all duration-500  ${
                    isOpen ? "max-h-fit my-4 pb-2" : "max-h-0 overflow-hidden"
                }`}
            >
                {pendingOrders &&
                pendingOrders.filter(
                    (order) => order.tableNumber === tableNumber
                ).length ? (
                    <OrderTableCard
                        // orderId={order.id}
                        array={pendingOrders}
                        type="Ordenes pendientes"
                        color="red"
                        tableNumber={tableNumber}
                        action={setOrderInProgress}
                        actionDisplay="MARCAR EN PROGRESO"
                    />
                ) : (
                    ""
                )}
                {inProgressOrders &&
                inProgressOrders.filter(
                    (order) => order.tableNumber === tableNumber
                ).length ? (
                    <OrderTableCard
                        // orderId={order.id}
                        array={inProgressOrders}
                        type="Ordenes en progreso"
                        color="yellow"
                        tableNumber={tableNumber}
                        action={setOrderReady}
                        actionDisplay="MARCAR ORDEN LISTA"
                    />
                ) : (
                    ""
                )}
                {readyOrders &&
                readyOrders.filter((order) => order.tableNumber === tableNumber)
                    .length ? (
                    <OrderTableCard
                        // orderId={order.id}
                        array={readyOrders}
                        type="Ordenes listas"
                        color="green"
                        tableNumber={tableNumber}
                    />
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default MyTablesCards;
