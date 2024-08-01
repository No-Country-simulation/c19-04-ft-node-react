import React, { useState } from "react";

import useFireBase from "../../utils/hooks/useFireBase";

import TablesCards from "../../components/TablesCards/TablesCards";
import { useSelector } from "react-redux";
import { assignClientToTable } from "../../utils/api/assignClientToTable";
import { assignTableToWaiter } from "../../utils/api/assignTableToWaiter";
import MyTablesCards from "../../components/MyTablesCards/MyTablesCards";
import { closeTable } from "../../utils/api/closeTable";
import { attendCall } from "../../utils/api/attendCall";

function WaitersTemp() {
    const [orders, setOrders] = useFireBase("/orders", {});
    const [tables, setTables] = useFireBase("/tables", {});
    const [waiters, setWaiters] = useFireBase("/waiters", {});

    const tablesArray = Object.keys(tables).filter(
        (table) => table !== "unassignedTables"
    );

    const ordersIds =
        orders && orders.pending ? Object.keys(orders?.pending) : [];

    const pendingOrders = ordersIds.map((id) => ({
        ...orders.pending[id],
        id,
    }));

    // console.log(orders);
    // console.log(pendingOrders);

    const waiterUserName = useSelector(
        (store) => store.user?.currentUser?.username
    );

    const [showMessageBox, setShowMessageBox] = useState(false);

    const [tableToAssignClient, setTableToAssignClient] = useState(null);

    const [clientName, setClientName] = useState("");

    const assignClient = (event) => {
        setTableToAssignClient(event.target.value);
        setShowMessageBox(true);
    };

    const handleSetTable = (event) => {
        event.preventDefault();
        assignClientToTable(tableToAssignClient, clientName);
        setShowMessageBox(false);
    };

    const closeMessageBox = () => {
        setShowMessageBox(false);
        setClientName("");
    };

    const handleClientName = (event) => {
        setClientName(event.target.value);
    };

    const attendTable = (event) => {
        const tableNumber = event.target.value;
        assignTableToWaiter(tableNumber, waiterUserName);
    };

    const handlerCloseTable = async (event) => {
        const tableNumber = event.target.value;
        const order = pendingOrders
            .filter((order) => order.tableNumber === tableNumber)
            .map((order) => order.id);
        try {
            await closeTable(tableNumber, order);

            //   await deleteOrder(order);

            let newAssigned = waiters[waiterUserName]?.assignedTables?.filter(
                (item) => item !== `Table ${event.target.value}`
            );

            if (newAssigned.length === 0) {
                newAssigned = "";
            }

            console.log(newAssigned);
            const newWaiters = {
                ...waiters,
                [waiterUserName]: {
                    ...waiters[waiterUserName],
                    assignedTables: newAssigned,
                },
            };
            setWaiters(newWaiters); //ACTIVAR PARA DESASIGNAR MESA
        } catch (error) {
            console.log("No se pudo cerrar la mesa");
        }
    };
    const handlerAttendCall = (event) => {
        const tableNumber = event.target.value;
        attendCall(tableNumber, waiterUserName);
    };
    return (
        <div className="w-full min-h-[100dvh] bg-customBgMain">
            <div className="p-6">
                <h4>Tus mesas</h4>
                {waiters[waiterUserName]?.assignedTables &&
                    waiters[waiterUserName]?.assignedTables?.map((t, index) => (
                        <MyTablesCards
                        //mesas atendidas
                            key={t + index}
                            tableNumber={
                                typeof t === "string"
                                    ? t.split(" ")[1]
                                    : t.toString()
                            }
                            action="Cerrar mesa"
                            requested={waiters[
                                waiterUserName
                            ]?.requestedBy?.includes(t)}
                            handlerCloseTable={handlerCloseTable}
                            handlerAttend={handlerAttendCall}
                            pendingOrders={pendingOrders}
                        />
                    ))}
            </div>
            <div className="p-6">
                <h4>Mesas sin mesero asignado</h4>
                {tables?.unassignedTables &&
                    tables?.unassignedTables?.map((t) => (
                        //mesas sin mesero
                        <TablesCards
                            key={t}
                            tableNumber={t}
                            action="Atender"
                            handler={attendTable}
                        />
                    ))}
            </div>
            <div className="p-6">
                <h4>Mesas desocupadas</h4>
                {tablesArray
                    .filter((t) => !tables[t].isActive)
                    .map((t) => (
                        // mesas desocupadas
                        <TablesCards
                            key={t}
                            tableNumber={t.split("_")[1]}
                            action="Activar"
                            handler={assignClient}
                        />
                    ))}
            </div>
            {showMessageBox ? (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur bg-black bg-opacity-50">
                    <div className="h-[300px] w-[300px] rounded-[12px] flex items-center justify-center bg-white">
                        <form
                            className="flex flex-col items-center"
                            onSubmit={handleSetTable}
                        >
                            <div>Nombre del cliente</div>
                            <input
                                className="border border-red-300 mb-6"
                                type="text"
                                onChange={handleClientName}
                                value={clientName}
                            />
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    className="border border-red-300 py-2 px-4 rounded-[10px]"
                                    onClick={closeMessageBox}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="border border-red-300 py-2 px-4 rounded-[10px]"
                                >
                                    Aceptar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default WaitersTemp;
