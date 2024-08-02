import "../../styles/scrollbarContainerDashboard.css";
import ManagementWaiters from "../ManagementControl/ManagementWaiters/ManagementWaiters";
import ManagementUsers from "../ManagementControl/ManagementUsers/ManagementUsers";
import MenuManager from "../MenuManager/MenuManager";
import OrdersDeliveries from "../ManagementControl/OrdersDeliveries/OrdersDeliveries";
import logoMain from "../../assets/images/logoMain.svg";

const ContainerComponentsDashboard = ({ selectedOption }) => {
    return (
        <div className="bg-customGray-50 w-[70vw] min-w-[70vw] max-h-[80vh] h-[80vh] border border-gray-300 rounded-lg overflow-y-scroll custom-scrollbar scroll-smooth mx-auto my-auto">
            {!selectedOption && (
                <div className="flex items-center justify-center w-full h-full">
                    <img
                        src={logoMain}
                        alt="logoMain"
                        className="max-w-[55%] mx-auto "
                    />
                </div>
            )}

            {selectedOption === "Gestión Menú" && <MenuManager />}
            {selectedOption === "Gestión Usuarios" && <ManagementUsers />}
            {/* { selectedOption === 'Gestión Meseros' && <ManagementWaiters />} */}
            {/* { selectedOption === 'Pedidos / Entregas' && <OrdersDeliveries />} */}
        </div>
    );
};

export default ContainerComponentsDashboard;
