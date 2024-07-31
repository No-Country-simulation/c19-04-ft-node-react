import React from "react";
import served from "../../utils/functions/served";
import { useDispatch, useSelector } from "react-redux";
import { getCallsToWaiters } from "../../state/store/slices/callWaiter/actionWaiter/getCallsToWaiter";

function TablesCards({ handler, tableNumber, action }) {
    // console.log(active);
    // console.log(tableNumber);
    const dispatch = useDispatch();

    // const waiterUsername = "carlosc";

    const currentUser = useSelector((state) => state.user.currentUser);

    return (
        <div className="border border-customRed p-2 flex justify-between items-center">
            <h2>Mesa {tableNumber}</h2>
            <button
                className="border border-customRed bg-customLight py-1 px-6 rounded-xl"
                onClick={handler}
                value={tableNumber}
            >
                {action}
            </button>
        </div>
    );
}

export default TablesCards;
