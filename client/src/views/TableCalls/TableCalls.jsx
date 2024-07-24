import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCallsToWaiters } from "../../state/store/slices/callWaiter/actionWaiter/getCallsToWaiter";
import TablesCards from "../../components/TablesCards/TablesCards";
import CustomCall from "../../components/CustomCall/CustomCall";

function TableCalls() {
    const dispatch = useDispatch();

    const { tables, loading, error } = useSelector(
        (state) => state.callWaiters
    );

    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        currentUser && dispatch(getCallsToWaiters(currentUser.username));
    }, []);

    const waiterUsername = "carlosc";

    return (
        <div>
            Table Calls
            <CustomCall />
            <div className="flex gap-4 border border-customBlue">
                {tables.map((item) => (
                    <TablesCards
                        key={`table${item.tableNumber}`}
                        table={item.tableNumber}
                    />
                ))}
            </div>
        </div>
    );
}

export default TableCalls;
