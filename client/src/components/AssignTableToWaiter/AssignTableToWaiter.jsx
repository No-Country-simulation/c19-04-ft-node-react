import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyWaiters } from "../../state/store/slices/allWaiters/allWaitersSlice";
import { allWaitersGet } from "../../state/store/slices/allWaiters/actionsAllWaiters/actionsAllWaiters";
import { assignTable } from "../../utils/api/assignTable";

function AssignTableToWaiter() {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const allWaitersState = useSelector((state) => state.allWaiters);

    useEffect(() => {
        dispatch(allWaitersGet());

        return () => {
            dispatch(emptyWaiters());
        };
    }, []);

    const allTables = [1, 2, 3, 4, 5, 6, 7, 8];

    const handleTableAssign = async (event) => {
        setLoading(true);
        const table = Number(event.target.value);
        const userWaiter = event.target.getAttribute("data-username");

        let tablesAssigned = allWaitersState.waiters.find(
            (w) => w.username === userWaiter
        ).tablesAssigned;

        if (tablesAssigned.includes(table)) {
            tablesAssigned = tablesAssigned.filter((item) => item !== table);
        } else {
            tablesAssigned = [...tablesAssigned, table];
        }

        await assignTable(tablesAssigned, userWaiter);

        dispatch(allWaitersGet());
        setLoading(false);
    };

    return (
        <div className={loading ? "disable-mouse" : ""}>
            <div className="w-full border border-red-700 grid grid-cols-6 gap-2">
                <div className="col-start-1 col-span-2 border border-blue-700">
                    ID
                </div>
                <div className="col-start-3 col-span-1 border border-blue-700">
                    USERNAME
                </div>
                <div className="col-start-4 col-span-3  border border-blue-700 flex gap-2">
                    TABLES
                </div>
            </div>
            {allWaitersState &&
                allWaitersState.waiters &&
                allWaitersState.waiters.map((waiter) => {
                    return (
                        <div
                            key={`${waiter.id}${waiter.username}`}
                            className="w-full my-4 border border-red-700 grid grid-cols-6 gap-2"
                        >
                            <div className="col-start-1 col-span-2 border border-blue-700">
                                {waiter.id}
                            </div>
                            <div className="col-start-3 col-span-1 border border-blue-700">
                                {waiter.username}
                            </div>
                            <div className="col-start-4 col-span-3  border border-blue-700 flex gap-2">
                                {allTables &&
                                    allTables.map((table) => {
                                        const assigned =
                                            waiter.tablesAssigned &&
                                            waiter.tablesAssigned.includes(
                                                table
                                            );

                                        return (
                                            <button
                                                key={`${waiter.username}/${table}`}
                                                value={table}
                                                data-username={waiter.username}
                                                onClick={handleTableAssign}
                                                className={`border ${
                                                    assigned
                                                        ? "border-green-500 bg-green-200"
                                                        : "border-red-500 bg-red-200"
                                                } p-2`}
                                            >
                                                {table}
                                            </button>
                                        );
                                    })}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default AssignTableToWaiter;
