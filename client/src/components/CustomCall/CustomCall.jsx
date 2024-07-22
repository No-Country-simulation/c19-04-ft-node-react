import React, { useState } from "react";
import callWaiter from "../../utils/functions/callWaiterToTable";
import { useDispatch } from "react-redux";
import { getCallsToWaiters } from "../../state/store/slices/waiter/actionWaiter/getCallsToWaiter";

function CustomCall() {
    const [table, setTable] = useState("");
    const dispatch = useDispatch();
    const waiterUsername = "carlosc";
    return (
        <div>
            <input
                value={table}
                onChange={(e) => {
                    setTable(e.target.value);
                }}
                type="text"
            />
            <label htmlFor=""></label>
            <button
                onClick={async () => {
                    await callWaiter(table);
                    dispatch(getCallsToWaiters(waiterUsername));
                }}
            >
                Atender
            </button>
        </div>
    );
}

export default CustomCall;
