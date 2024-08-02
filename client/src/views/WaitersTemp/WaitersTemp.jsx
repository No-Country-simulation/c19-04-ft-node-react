import React, { useState } from "react";

import useFireBase from "../../utils/hooks/useFireBase";

import TablesCards from "../../components/TablesCards/TablesCards";
import { useSelector } from "react-redux";
import { assignClientToTable } from "../../utils/api/assignClientToTable";
import { assignTableToWaiter } from "../../utils/api/assignTableToWaiter";
import MyTablesCards from "../../components/MyTablesCards/MyTablesCards";
import { closeTable } from "../../utils/api/closeTable";
import { attendCall } from "../../utils/api/attendCall";
import MainButton from "../../components/Buttons/MainButton";
import { useNavigateHelper } from "../../utils/hooks/useNavigations";

function WaitersTemp() {
    const [orders, setOrders] = useFireBase("/orders", {});
    const [tables, setTables] = useFireBase("/tables", {});
    const [waiters, setWaiters] = useFireBase("/waiters", {});

    const { navigateTo } = useNavigateHelper();

    const tablesArray = Object.keys(tables).filter(
        (table) => table !== "unassignedTables"
    );

    // Ordenes con estado pending
    const pendingIds =
        orders && orders.pending ? Object.keys(orders?.pending) : [];

    const pendingOrders = pendingIds.map((id) => ({
        ...orders.pending[id],
        id,
    }));

    // Ordenes con estado inProgress
    const inProgressIds =
        orders && orders.inProgress ? Object.keys(orders?.inProgress) : [];

    const inProgressOrders = inProgressIds.map((id) => ({
        ...orders.inProgress[id],
        id,
    }));

    // Ordenes con estado ready
    const readyIds = orders && orders.ready ? Object.keys(orders?.ready) : [];

    const readyOrders = readyIds.map((id) => ({
        ...orders.ready[id],
        id,
    }));

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
        const pendingOrdersIdsArray = pendingOrders
            .filter((order) => order.tableNumber === tableNumber)
            .map((order) => order.id);
        const inProgressOrdersIdsArray = inProgressOrders
            .filter((order) => order.tableNumber === tableNumber)
            .map((order) => order.id);
        const readyOrdersIdsArray = readyOrders
            .filter((order) => order.tableNumber === tableNumber)
            .map((order) => order.id);

        const allIds = [
            ...pendingOrdersIdsArray,
            ...inProgressOrdersIdsArray,
            ...readyOrdersIdsArray,
        ];

        try {
            // ACTIVAR PARA CERRAR MESA
            await closeTable(tableNumber, allIds);
            const newOrdersToSet = { ...orders };

            allIds.forEach((id) => {
                if (newOrdersToSet.pending?.hasOwnProperty(id))
                    newOrdersToSet.pending[id] = null;
                if (newOrdersToSet.inProgress?.hasOwnProperty(id))
                    newOrdersToSet.inProgress[id] = null;
                if (newOrdersToSet.ready?.hasOwnProperty(id))
                    newOrdersToSet.ready[id] = null;
            });

            // ACTIVAR
            setOrders(newOrdersToSet);

            let newAssigned = waiters[waiterUserName]?.assignedTables?.filter(
                (item) => item !== `Table ${event.target.value}`
            );

            if (newAssigned.length === 0) {
                newAssigned = "";
            }

            const newWaiters = {
                ...waiters,
                [waiterUserName]: {
                    ...waiters[waiterUserName],
                    assignedTables: newAssigned,
                },
            };
            // ACTIVAR PARA DESASIGNAR MESA
            setWaiters(newWaiters);
        } catch (error) {}
    };
    const handlerAttendCall = (event) => {
        const tableNumber = event.target.value;
        attendCall(tableNumber, waiterUserName);
    };
    return (
        <div className="w-full min-h-[100dvh] bg-customBgMain">
            <h2 className="font-semibold text-center pt-4">
                {" "}
                ¡Hola {waiterUserName}!
            </h2>
            <div className="p-6">
                <h4 className="text-gray-400 mb-2">Tus mesas </h4>
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
                            inProgressOrders={inProgressOrders}
                            readyOrders={readyOrders}
                        />
                    ))}
            </div>
            <div className="p-6">
                <h4 className="text-gray-400 mb-2">
                    Mesas sin mesero asignado
                </h4>
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
                <h4 className="text-gray-400 mb-2">Mesas desocupadas</h4>
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
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur bg-black bg-opacity-50 ">
                    <div className="h-[300px] w-[300px] rounded-[12px] flex items-center justify-center bg-slate-50">
                        <form
                            className="flex flex-col items-center gap-4 text-sm"
                            onSubmit={handleSetTable}
                        >
                            <div>Nombre del cliente</div>
                            <input
                                className="border border-customRed-400 my-6 text-base"
                                type="text"
                                onChange={handleClientName}
                                value={clientName}
                            />
                            <div className="flex gap-6">
                                <button
                                    type="button"
                                    className="border border-customRed-400 py-1 px-4 rounded"
                                    onClick={closeMessageBox}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="border border-customRed-400 py-1 px-4 rounded"
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

            {/* navegando a la ruta de crear orden */}
            <div className="flex justify-center py-2 sticky bottom-0 bg-opacity-100  backdrop-filter backdrop-blur-3xl">
                <MainButton
                    children="Crear orden"
                    classNameSize="w-[90%] h-[40px]"
                    onClick={() => navigateTo("/createOrder")}
                />
            </div>
        </div>
    );
}

export default WaitersTemp;
