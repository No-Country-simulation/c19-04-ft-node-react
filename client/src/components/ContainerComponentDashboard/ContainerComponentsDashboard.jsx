import { useState } from "react";
import "../../styles/scrollbarContainerDashboard.css"
import ManagementWaiters from "../ManagementControl/ManagementWaiters/ManagementWaiters";
import ManagementMenu from "../ManagementControl/ManagementMenu/ManagementMenu";
import ManagementUsers from "../ManagementControl/ManagementUsers/ManagementUsers"
import MenuManager from "../MenuManager/MenuManager";
import OrdersDeliveries from "../ManagementControl/OrdersDeliveries/OrdersDeliveries"

const ContainerComponentsDashboard = ({ selectedOption }) => {

    return (
        <div className="bg-customGray-50 w-[70vw] min-w-[70vw] max-h-[80vh] h-[80vh] border border-gray-300 rounded-lg overflow-y-scroll custom-scrollbar scroll-smooth mx-auto my-auto">
            
            { selectedOption === 'Gestión Menú' && <MenuManager />}
            { selectedOption === 'Gestión Meseros' && <ManagementWaiters />}
            { selectedOption === 'Gestión Usuarios' && <ManagementUsers />}
            { selectedOption === 'Pedidos / Entregas' && <OrdersDeliveries />}
            
        </div>
    );
}

export default ContainerComponentsDashboard;