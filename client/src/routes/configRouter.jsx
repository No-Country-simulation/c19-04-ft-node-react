import Home from "../views/Home/Home.jsx";
import NotFound from "../views/NotFound/NotFound.jsx";
import ShoppingCart from "../views/ShoppingCart/ShoppingCart.jsx";

const routerPathComponent = [
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/shoppingcart",
    element: <ShoppingCart />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routerPathComponent;
