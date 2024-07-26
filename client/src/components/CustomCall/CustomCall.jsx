import React, { useState } from "react";
import callWaiter from "../../utils/functions/callWaiterToTable";
import { useDispatch, useSelector } from "react-redux";
import { getCallsToWaiters } from "../../state/store/slices/callWaiter/actionWaiter/getCallsToWaiter";

function CustomCall() {
    const [table, setTable] = useState("");
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.user.currentUser);

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

                    currentUser &&
                        currentUser.username &&
                        dispatch(getCallsToWaiters(currentUser.username));
                }}
            >
                Atender
            </button>
        </div>
    );
}

export default CustomCall;
