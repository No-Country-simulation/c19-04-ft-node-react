import React, { useState } from "react";

import { ref, get } from "firebase/database";
import database from "../../connections/firebase";

import useFireBase from "../../utils/hooks/useFireBase";

import TablesCards from "../../components/TablesCards/TablesCards";
import { useSelector } from "react-redux";
import { assignClientToTable } from "../../utils/api/assignClientToTable";

function WaitersTemp() {
    const [orders, setOrders] = useFireBase("/orders", {});
    const [tables, setTables] = useFireBase("/tables", {});

    const tablesArray = Object.keys(tables).filter(
        (table) => table !== "unassignedTables"
    );

    const waiterUserName = useSelector(
        (store) => store.user.currentUser.username
    );

    const [showMessageBox, setShowMessageBox] = useState(false);

    const [tableToAssignClient, setTableToAssignClient] = useState(null);

    const [clientName, setClientName] = useState("");

    const assignClient = (event) => {
        console.log(event.target.value);
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

    const attendTable = () => {};

    return (
        <div className="w-full min-h-[100dvh]">
            <div className="p-6">
                <h4>Tus mesas</h4>
                {tablesArray
                    .filter(
                        (t) =>
                            tables[t]?.waiter &&
                            tables[t]?.waiter === waiterUserName
                    )
                    .map((t) => (
                        <TablesCards
                            key={t}
                            tableNumber={t.split("_")[1]}
                            action="Desocupar"
                        />
                    ))}
            </div>
            <div className="p-6">
                <h4>Mesas sin mesero asignado</h4>
                {tables?.unassignedTables?.map((t) => (
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
