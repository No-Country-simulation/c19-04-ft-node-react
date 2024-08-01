import React from "react";

function TablesCards({ handler, tableNumber, action }) {
    return (
        <div className="border border-customRed p-2 flex justify-between items-center">
            <h2>Mesa {tableNumber}</h2>
            <button
                className="border border-customRed bg-white py-1 px-6 rounded-xl"
                onClick={handler}
                value={tableNumber}
            >
                {action}
            </button>
        </div>
    );
}

export default TablesCards;
