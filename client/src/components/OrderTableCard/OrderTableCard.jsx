import React from "react";

function OrderTableCard({
    array,
    type,
    color,
    tableNumber,
    action,
    actionDisplay,
    orderId,
}) {
    return (
        <div className={`px-4 border border-${color}-500`}>
            <div>{type}</div>
            {array &&
                array.filter &&
                array
                    .filter((order) => order.tableNumber === tableNumber)
                    .map((order) => (
                        <div
                            key={order.orderNumber + order.id}
                            className="px-4"
                        >
                            {/* {order.id} */}
                            <div>Orden numero: {order.orderNumber}</div>
                            <div>Platos pedidos:</div>
                            <div className="px-4">
                                {order.order.map((dish, index) => (
                                    <div key={dish.title + index}>
                                        {dish.title}
                                    </div>
                                ))}
                            </div>
                            {action && (
                                <button
                                    type="button"
                                    className="border border-blue-700 rounded-[10px] p-4"
                                    onClick={() => action(order.id)}
                                >
                                    {actionDisplay}
                                </button>
                            )}
                        </div>
                    ))}
        </div>
    );
}

export default OrderTableCard;
