import React from "react";

function MyTablesCards({
    handlerAttend,
    handlerCloseTable,
    tableNumber,
    requested,
    pendingOrders,
}) {
    console.log(pendingOrders);
    console.log(tableNumber);
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
                pendingOrders
                    .filter((order) => order.tableNumber === tableNumber)
                    .map((order) => (
                        <div className="p-2">
                            {/* {order.id} */}
                            <div>Orden numero: {order.orderNumber}</div>
                            <div>Platos pedidos:</div>
                            <div className="px-4">
                                {order.order.map((dish) => (
                                    <div>{dish.title}</div>
                                ))}
                            </div>
                        </div>
                    ))}
        </div>
    );
}

export default MyTablesCards;
