import Home from "../views/Home/Home.jsx";
import NotFound from "../views/NotFound/NotFound.jsx";
import DashBoardAdmins from "../views/Admin/DashBoardAdmin.jsx";
import InvalidPasswordMessage from "../components/InvalidPasswordMessage/InvalidPasswordMessage.jsx";
import ShoppingCart from "../views/ShoppingCart/ShoppingCart.jsx";
import RegisterSuccessfully from "../components/RegisterSuccessfully/RegisterSuccessfully.jsx";
import RegisterDenied from "../components/RegisterDenied/RegisterDenied.jsx";
import RegisterDeniedBD from "../components/RegisterDenied/RegisterBdDenied.jsx";
import Buttons from "../components/Buttons/Buttons.jsx";
import MainViewMenu from "../views/MainViewMenu/MainViewMenu.jsx";
import TableCalls from "../views/TableCalls/TableCalls.jsx";
import AdminAssignTables from "../views/AdminAssignTables/AdminAssignTables.jsx";
import ManageUsers from "../views/ManageUsers/ManageUsers.jsx";
import WaitersOrders from "../views/WaiterOrders/WaitersOrders.jsx";
import PopupCartPostOrder from "../components/PopupCartPostOrder/PopupCartPostOrder.jsx";
// import DetailModalPage from "../views/DetailModal/DetailModalPage.jsx";
import WaitersTemp from "../views/WaitersTemp/WaitersTemp.jsx";
import Landing from "../views/Landing/Landing.jsx";
import NewOrderWaiter from "../views/NewOrderWaiter/NewOrderWaiter.jsx";
import KitchenBarPanel from "../views/KitchenBar/KitchenBarPanel.jsx";
import OrderList from "../components/OrderList/ContainerKitcherbarr.jsx";

const routerPathComponent = [
    {
        path: "/",
        element: <Landing />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/admin/register",
        element: <DashBoardAdmins />,
    },
    {
        path: "/admin",
        element: <DashBoardAdmins />,
    },
    {
        path: "/invalid-password",
        element: <InvalidPasswordMessage />,
    },
    {
        path: "/shopping-cart",
        element: <ShoppingCart />,
    },
    {
        path: "/register-successfully",
        element: <RegisterSuccessfully />,
    },
    {
        path: "/register-denied",
        element: <RegisterDenied />,
    },
    {
        path: "/register-offline",
        element: <RegisterDeniedBD />,
    },
    {
        path: "/buttons",
        element: <Buttons />,
    },
    {
        path: "menu/:table",
        element: <MainViewMenu />,
    },
    {
        path: "/my-order/:table",
        element: <ShoppingCart />,
    },

    {
        path: "/calls",
        element: <TableCalls />,
    },
    {
        path: "/admin/assign-tables",
        element: <AdminAssignTables />,
    },
    {
        path: "/admin/manage-users",
        element: <ManageUsers />,
    },
    {
        path: "/waiterOrders",
        element: <WaitersOrders />,
    },
    {
        path: "/popUpOrCartPedir",
        element: <PopupCartPostOrder />,
    },
    {
        path: "/OrderList",
        element: <OrderList />,
    },
    {
        path: "/waiter",
        element: <WaitersTemp />,
    },
    {
        path: "/kitchen",
        element: <KitchenBarPanel />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
];

export default routerPathComponent;
