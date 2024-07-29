import { Router } from "express";
import OrderController from "../controllers/order.controller.js";
import VerifyToken from "../middlewares/jwt.middleware.js";
import logger from "../utils/logger.js";
import { ClassOrderController } from "../controllers/order.controller.js";
const router = Router();

// POST SAVE FINAL ORDER IN MONGO
router.post("/save", OrderController.saveOrder);

// POST CREATE NEW ORDER IN FIREBASE
router.post("/create", async (req, res) => {
  const { tableNumber, order } = req.body;
  if (!tableNumber || !order) {
    logger.error("Missing either tableNumber or order from body.");
    return res
      .status(400)
      .json({ error: "Missing either tableNumber or order from body." });
  }
  try {
    const newOrder = await OrderController.createOrder(tableNumber, order);
    logger[newOrder.responseType](newOrder.message);
    return res
      .status(newOrder.status)
      .json({ [newOrder.responseType]: newOrder.message });
  } catch (error) {
    logger.error(`Error in route 'order.routes POST/create'. ${error}`);
    return res.status(500).send("Internal server error.");
  }
});

// GET ALL ORDERS
router.get("/all", VerifyToken, OrderController.getAllOrders);

// GET PENDING ORDERS
router.get("/pending", VerifyToken, OrderController.getPendingOrders);

// GET IN PROGRESS ORDERS
router.get("/inProgress", VerifyToken, OrderController.getInProgressOrders);

// GET READY ORDERS
router.get("/ready", VerifyToken, OrderController.getReadyOrders);

// UPDATE STATUS
router.patch("/update/:orderId", VerifyToken, OrderController.updateStatus);

// DELETE ORDER
router.delete("/delete/:orderId", VerifyToken, OrderController.deleteOrder);

router.get("/", async (req, res) => {
  const { status, to } = req.query;
  if (!status || !to) {
    logger.error("Missing either 'status' or 'to' from query.");
    return res.status(400).json({
      error: "Missing either 'status' or 'to' from query.",
    });
  }
  if (status !== "pending" && status !== "inProgress" && status !== "ready") {
    logger.error("Status must be equal to 'pending', 'inProgress' or 'ready'.");
    return res.status(400).json({
      error: "Status must be equal to 'pending', 'inProgress' or 'ready'.",
    });
  }
  try {
    const orders = await ClassOrderController.getOrderByStatus(status, to);
    logger[orders.responseType](orders.message);
    return res
      .status(orders.status)
      .json({ [orders.responseType]: orders.message, result: orders.result });
  } catch (error) {
    let queries = [];
    Object.entries(req.query).map(([key, value]) => {
      queries.push(`${key}=${value}`);
    });
    logger.error(
      `Error in route 'order GET/orders?${queries.join("&")}. ${error}`
    );
    return res.status(500).send("Internal server error.");
  }
});

export default router;
