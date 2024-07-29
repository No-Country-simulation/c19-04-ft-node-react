import { Router } from "express";
import OrderController from "../controllers/order.controller.js";
import VerifyToken from "../middlewares/jwt.middleware.js";
import logger from "../utils/logger.js";
const router = Router();

// POST SAVE FINAL ORDER IN MONGO
// router.post("/save", async (req, res) => {
//   try {

//   } catch (error) {
//     logger.error(`Error in route 'order.routes POST/create'. ${error}`);
//     return res.status(500).send("Internal server error.");
//   }
// })

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
    const newOrder = await OrderController.create(tableNumber, order);
    logger[newOrder.responseType](newOrder.message);
    return res
      .status(newOrder.status)
      .json({ [newOrder.responseType]: newOrder.message });
  } catch (error) {
    logger.error(`Error in route 'order.routes POST/create'. ${error}`);
    return res.status(500).send("Internal server error.");
  }
});

// GET ALL ORDERS OR BY STATUS
router.get("/", VerifyToken, async (req, res) => {
  const { status, to } = req.query;
  // if (!status || !to) {
  //   logger.error("Missing either 'status' or 'to' from query.");
  //   return res.status(400).json({
  //     error: "Missing either 'status' or 'to' from query.",
  //   });
  // }
  if (
    status &&
    status !== "pending" &&
    status !== "inProgress" &&
    status !== "ready"
  ) {
    logger.error("Status must be equal to 'pending', 'inProgress' or 'ready'.");
    return res.status(400).json({
      error: "Status must be equal to 'pending', 'inProgress' or 'ready'.",
    });
  }
  try {
    if (status && to) {
      const orders = await OrderController.getByStatus(status, to);
      logger[orders.responseType](orders.message);
      return res
        .status(orders.status)
        .json({ [orders.responseType]: orders.message, result: orders.result });
    }
    const allOrders = await OrderController.getAll();
    logger[allOrders.responseType](allOrders.message);
    return res.status(allOrders.status).json({
      [allOrders.responseType]: allOrders.message,
      result: allOrders.result,
    });
  } catch (error) {
    logger.error(`Error in route 'order GET/orders. ${error}`);
    return res.status(500).send("Internal server error.");
  }
});
// // GET PENDING ORDERS
// router.get("/pending", VerifyToken, OrderController.getPendingOrders);

// // GET IN PROGRESS ORDERS
// router.get("/inProgress", VerifyToken, OrderController.getInProgressOrders);

// // GET READY ORDERS
// router.get("/ready", VerifyToken, OrderController.getReadyOrders);

// UPDATE STATUS
router.patch("/update/:orderId", VerifyToken, async (req, res) => {
  const { orderId } = req.params;
  const { updateTo } = req.body;
  if (!updateTo) {
    logger.error("Missing 'updateTo' from body.");
    return res.status(400).json({ error: "Missing 'updateTo' from body." });
  }
  try {
    const updatedOrder = await OrderController.updateStatus(orderId, updateTo);
    logger[updatedOrder.responseType](updatedOrder.message);
    return res
      .status(updatedOrder.status)
      .json({ [updatedOrder.responseType]: updatedOrder.message });
  } catch (error) {
    logger.error(
      `Error in route 'order.routes POST/update/:orderId'. ${error}`
    );
    return res.status(500).send("Internal server error.");
  }
});

// DELETE ORDER
router.delete("/:orderId", VerifyToken, async (req, res) => {
  const { orderId } = req.params;
  if (!orderId) {
    logger.error("Missing required orderId from params.");
    return res.status(400).send("Missing required orderId from params.");
  }
  try {
    const deletedOrder = await OrderController.delete(orderId);
    logger[deletedOrder.responseType](deletedOrder.message);
    return res
      .status(deletedOrder.status)
      .json({ [deletedOrder.responseType]: deletedOrder.message });
  } catch (error) {
    logger.error(
      `Error in route 'order.routes DELETE/delete/:orderId'. ${error}`
    );
    return res.status(500).send("Internal server error.");
  }
});

export default router;
