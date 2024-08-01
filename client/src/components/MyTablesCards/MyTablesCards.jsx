import React from "react";
import productSvg from "../../assets/svg/product.svg";
import userSvg from "../../assets/svg/user.svg";
import triangleIconSVG from "../../assets/svg/triangle-inverted.svg";

import { useState } from "react";

function MyTablesCards({
    handlerAttend,
    handlerCloseTable,
    tableNumber,
    requested,
    pendingOrders,
}) {
    console.log(pendingOrders);
    console.log(tableNumber);

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen((prevState) => !prevState);

    console.log(pendingOrders)

    return (
        <div
            className={`bg-white min-h-max text-sm shadow-lg rounded-lg transition-[border-radius] px-2 mb-2 ${isOpen ? " duration-0" : "duration-1000"
                }`}
        >
            <div className="p-2 flex justify-between items-center font-semibold border-b-2">
                <h2 >Mesa {tableNumber}</h2>
                <button onClick={toggleDropdown}>
                    <img
                        src={triangleIconSVG}
                        alt="Toggle"
                        className={`w-3 h-3 transform transition-transform duration-500 ${isOpen ? "rotate-180" : ""
                            }`}
                    />
                </button>
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
            <div className={`transition-all duration-500 overflow-hidden ${isOpen ? "max-h-max " : "max-h-0"}`}>

                {pendingOrders &&
                    pendingOrders
                        .filter((order) => order.tableNumber === tableNumber)
                        .map((order) => (
                            <div className="p-2 text-sm mb-3 ">
                                {/* {order.id} */}
                                <div>Orden numero : {order.orderNumber}</div>
                                <div className="flex gap-2 items-center mt-1">
                                    <img src={userSvg} alt="" />
                                    <p>Platos pedidos:</p>
                                </div>
                                <div className="px-4 mt-1">
                                    <ul>
                                        {order.order.map((dish) => (
                                            <li className="flex gap-2 items-center">
                                                <img src={productSvg} alt="products" />
                                                <p>
                                                    {dish.title}
                                                </p>
                                            </li>
                                        ))}

                                    </ul>
                                </div>
                            </div>
                        ))}

            </div>
        </div>
    );
}

export default MyTablesCards;
