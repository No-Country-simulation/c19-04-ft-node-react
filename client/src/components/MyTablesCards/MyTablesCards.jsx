import React from "react";

function MyTablesCards({
    handlerAttend,
    handlerCloseTable,
    tableNumber,
    requested,
}) {
    return (
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
    );
}

export default MyTablesCards;
