import { Routes } from "react-router-dom";
import routerPathComponent from "./configRouter";
import renderRoutes from "../utils/functions/renderRouter";

const AppRouter = () => {
  return (
    <Routes>
      {renderRoutes(routerPathComponent)}
    </Routes>
  );
};

export default AppRouter;
