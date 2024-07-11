import Home from "../views/Home/Home.jsx";
import NotFound from "../views/NotFound/NotFound.jsx";
import Login from "../components/Login/Login.jsx";

const routerPathComponent = [
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default routerPathComponent;
