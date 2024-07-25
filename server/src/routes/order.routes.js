import OrderController from "../controllers/order.controller.js";
import { Router } from "express";

const router = Router();

// POST SAVE FINAL ORDER IN MONGO
router.post("/save", OrderController.saveOrder);

// POST CREATE NEW ORDER IN FIREBASE
router.post("/create", OrderController.createOrder);

// GET ALL ORDERS
router.get("/all", OrderController.getAllOrders);

// GET PENDING ORDERS
router.get("/pending", OrderController.getPendingOrders);

// UPDATE STATUS
router.patch("/update/:orderId", OrderController.updateStatus);

// GET READY ORDERS
router.get("/ready", OrderController.getReadyOrders);

// DELETE ORDER
router.delete("/delete/:orderId", OrderController.deleteOrder);

export default router;
