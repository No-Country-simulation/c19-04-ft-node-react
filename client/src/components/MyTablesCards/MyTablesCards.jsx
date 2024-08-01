import React from "react";
import OrderTableCard from "../OrderTableCard/OrderTableCard";
import { setOrderInProgress } from "../../utils/api/setOrderInProgress.";
import { setOrderReady } from "../../utils/api/setOrderReady";

function MyTablesCards({
    handlerAttend,
    handlerCloseTable,
    tableNumber,
    requested,
    pendingOrders,
    inProgressOrders,
    readyOrders,
}) {
    return (
        <div className="flex flex-col">
            <div className="border border-customRed p-2 flex justify-between items-center">
                <h2>Mesa {tableNumber}</h2>
                <div className="flex content-baseline">
                    {requested && (
                        <div className="py-1 px-2 border border-transparent">
                            🙋
                        </div>
                    )}{" "}
                    {requested && (
                        <button
                            className="border border-customRed bg-white py-1 px-6 rounded-xl"
                            onClick={handlerAttend}
                            value={tableNumber}
                        >
                            Atender llamado
                        </button>
                    )}
                    <button
                        className="border border-customRed bg-white py-1 px-6 rounded-xl"
                        onClick={handlerCloseTable}
                        value={tableNumber}
                    >
                        Cerrar mesa
                    </button>
                </div>
            </div>
            {pendingOrders &&
            pendingOrders.filter((order) => order.tableNumber === tableNumber)
                .length ? (
                <OrderTableCard
                    // orderId={order.id}
                    array={pendingOrders}
                    type="Ordenes pendientes"
                    color="red"
                    tableNumber={tableNumber}
                    action={setOrderInProgress}
                    actionDisplay="Marcar como EN PROGRESO"
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
                    actionDisplay="Marcar como LISTA"
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
    );
}

export default MyTablesCards;
