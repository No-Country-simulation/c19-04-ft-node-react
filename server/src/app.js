import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "./utils/logger.js";
import { ServerUp } from "./connections/server.js";
import TableRoutes from "./routes/table.routes.js";
import AuthRoutes from "./routes/auth.routes.js";
import AdminRoutes from "./routes/administrator.routes.js";
import WaiterRoutes from "./routes/waiter.routes.js";
import CardMenuRoutes from "./routes/card-menu.routes.js";
import OrderRoutes from "./routes/order.routes.js";
import VerifyToken from "./middlewares/jwt.middleware.js";

const app = express();
app.disable("x-powered-by");

app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5173", // Reemplaza con el dominio de tu frontend
        credentials: true, // Permite el envío de cookies con las solicitudes
    })
);

app.use(cookieParser());

app.get("/", (req, res) => {
    res.json("C19-04-backend");
});

app.get("/health", (req, res) => {
    logger.http("Health OK.");
    res.json("Health OK");
});

app.use('/api/table', TableRoutes)
app.use('/api/auth', AuthRoutes)
app.use('/api/admin', VerifyToken, AdminRoutes)
app.use('/api/waiter', WaiterRoutes)
app.use('/api/card-menu', CardMenuRoutes)
app.use('/api/orders', VerifyToken, OrderRoutes)

ServerUp(app);
