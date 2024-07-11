import Home from "../views/Home/Home.jsx";
import Login from "../components/Login/Login.jsx";
import NotFound from "../views/NotFound/NotFound.jsx";
import CustomerActions from "../components/CustomerActions/CustomerActions.jsx";
import DashBoardAdmins from "../views/Admin/DashBoardAdmin.jsx";
import InvalidPasswordMessage from "../components/InvalidPasswordMessage/InvalidPasswordMessage.jsx";
import ShoppingCart from "../views/ShoppingCart/ShoppingCart.jsx";

const routerPathComponent = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin/register",
    element: <DashBoardAdmins />,
  },
  {
    path: "/customer-actions",
    element: <CustomerActions />,
  },
  {
    path: "/login",
    element: <Login />,
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
    path: "*",
    element: <NotFound />,
  },
];

export default routerPathComponent;
