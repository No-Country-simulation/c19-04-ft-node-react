import { Router } from "express";
import WaiterController from "../controllers/waiter.controller.js";
import VerifyToken from "../middlewares/jwt.middleware.js";
import logger from "../utils/logger.js";

const router = Router();

router.post("/create", VerifyToken, WaiterController.createWaiter);
router.post("/requestWaiter/:username", WaiterController.requestWaiter);
router.post("/attendRequest/:username", WaiterController.attendRequest);
router.post("/closeTable/:tableNumber", VerifyToken, async (req, res) => {
  const { tableNumber } = req.params;
  const { order } = req.body;
  if (!order) {
    logger.error("Missing order from body.");
    return res.status(400).json({ error: "Missing order from body." });
  }
  try {
    const closeTable = await WaiterController.closeTable(tableNumber, order);
    info[closeTable.responseType](closeTable.message);
    return res
      .status(closeTable.status)
      .json({ [closeTable.responseType]: closeTable.message });
  } catch (error) {
    logger.error(`Error in route 'waiter POST/closeTable/${tabl}. ${error}`);
    return res.status(500).send("Internal server error.");
  }
});

export default router;
