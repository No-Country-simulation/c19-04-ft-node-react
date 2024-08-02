import React from "react";

function TablesCards({ handler, tableNumber, action }) {
    return (
        <div className="bg-white border border-customRed p-2 flex justify-between items-center rounded-lg shadow-custom-light mt-2">
            <h2 className="text-sm font-semibold">Mesa {tableNumber}</h2>
            <button
                className="box-border px-3  py-1 rounded-lg text-white font-bold shadow-md bg-customRed-400 hover:bg-red-500 active:bg-red-600"

                onClick={handler}
                value={tableNumber}
            >
                {action}
            </button>
        </div>
    );
}

export default TablesCards;
