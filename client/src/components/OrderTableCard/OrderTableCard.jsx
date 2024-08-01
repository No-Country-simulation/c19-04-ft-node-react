import React from "react";
import productSvg from "../../assets/svg/product.svg";
import userSvg from "../../assets/svg/user.svg";

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
        <div className={` px-4 py-2 border-2 border-green-500 border-${color}-600 text-[11px] rounded-xl mb-2`}>
            <div className={` font-semibold text-xs text-${color}-700 my-2`}>{type}</div>
            {array &&
                array.filter &&
                array
                    .filter((order) => order.tableNumber === tableNumber)
                    .map((order) => (
                        <div
                            key={order.orderNumber + order.id}
                            className="px-4 flex flex-col gap-1"
                        >
                            {/* {order.id} */}
                            <hr />
                            <div>
                                <p className={`text-xs mt-1 text-${color}-500`}>
                                    Orden numero: #{order.orderNumber}
                                </p>
                            </div>
                            <div>
                                <p className="text-[12px]">Platos pedidos:</p>
                            </div>
                            <div className="px-2">
                                {order.order.map((dish, index) => (
                                    <div key={dish.title + index} className="flex  gap-1">
                                        <img src={productSvg} alt="Pedido" />
                                        <p className="text-gray-400">{dish.title}</p>
                                    </div>
                                ))}
                            </div>
                            {action && (
                                <button
                                    type="button"
                                    className={`border border-${color}-700 rounded-[10px] px-2 py-1 my-2 max-w-40 min-w-36 self-center`}
                                    onClick={() => action(order.id)}
                                >
                                    {actionDisplay}
                                </button>
                            )}
                            <hr/>
                        </div>
                    ))}
        
        </div>
    );
}

export default OrderTableCard;
