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
    }, [dispatch]);

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
            <h1 className="text-[18px] mb-4">
                Asignacion de mesas a los meseros
            </h1>
            <div className="w-full border bg-slate-400 grid grid-cols-6 gap-2 min-h-[3em] place-content-center text-[14px]">
                <div className="col-start-1 col-span-1 md:col-span-2 text-center">
                    ID
                </div>
                <div className="col-start-2 md:col-start-3 col-span-1 text-center break-words">
                    Nombre de usuario
                </div>
                <div className="col-start-3 md:col-start-4 col-span-full text-center">
                    Mesas asignadas
                </div>
            </div>
            {allWaitersState?.waiters?.map((waiter) => {
                return (
                    <div
                        key={`${waiter.id}${waiter.username}`}
                        className="w-full my-4 grid grid-cols-6 gap-2 min-h-[3em]"
                    >
                        <div className="col-start-1 col-span-1 md:col-span-2 w-full flex items-center px-2">
                            <h4 className="break-all h-min text-[12px]">
                                {waiter.id}
                            </h4>
                        </div>
                        <div className="col-start-2 md:col-start-3 col-span-1 w-full flex items-center px-2">
                            <h4 className="break-all h-min text-[12px]">
                                {waiter.username}
                            </h4>
                        </div>
                        <div className="col-start-3 md:col-start-4 col-span-full flex flex-wrap gap-2 px-2 items-center">
                            {allTables?.map((table) => {
                                const assigned =
                                    waiter.tablesAssigned?.includes(table);

                                return (
                                    <button
                                        type="button"
                                        key={`${waiter.username}/${table}`}
                                        value={table}
                                        data-username={waiter.username}
                                        onClick={handleTableAssign}
                                        className={`border ${
                                            assigned
                                                ? "border-green-500 bg-green-200"
                                                : "border-red-500 bg-red-200"
                                        } h-8 w-8 rounded-[10px] text-[12px]`}
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
