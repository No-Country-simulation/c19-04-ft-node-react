import React from "react";
import served from "../../utils/functions/served";
import { useDispatch } from "react-redux";
import { getCallsToWaiters } from "../../state/store/slices/waiter/actionWaiter/getCallsToWaiter";

function TablesCards({ table }) {
    const dispatch = useDispatch();

    const waiterUsername = "carlosc";

    const handleServed = async () => {
        await served(table);
        dispatch(getCallsToWaiters(waiterUsername));
    };

    return (
        <div className="border border-customRed w-clamp-200-300 h-28 flex flex-col justify-center items-center">
            <h2>{table}</h2>
            <button
                className="border border-customRed bg-customLight py-1 px-6 rounded-xl"
                onClick={handleServed}
            >
                Atendido!
            </button>
        </div>
    );
}

export default TablesCards;
