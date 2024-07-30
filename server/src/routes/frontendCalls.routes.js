import { Router } from "express";
import logger from "../utils/logger.js";
import database from "../connections/firebase.js";
import { ref, get, set } from "firebase/database";
import FrontendCallsController from "../controllers/frontendCalls.controller.js";
import OrderController from "../controllers/order.controller.js";
const router = Router();

// POST: SET DINER READY TO TRUE
router.post("/ready", async (req, res) => {
  const { tableNumber, index, order } = req.body;
  if (!tableNumber || !(index >= 0) || !order) {
    logger.error("Missing either tableNumber, index or order from body.");
    return res.status(400).send({
      message: "Missing either tableNumber, index or order from body.",
    });
  }
  try {
    const setReady = await FrontendCallsController.setReady(
      tableNumber,
      index,
      order
    );
    logger[setReady.responseType](setReady.message);
    return res.status(setReady.status).json({
      [setReady.responseType]: setReady.message,
    });
  } catch (error) {
    logger.error(`Error in route 'frontendCalls POST/ready'. ${error}`);
    return res.status(500).send("Internal server error.");
  }
});

// POST: CREATE INDIVIDUAL ORDER
router.post("/:table_number/:dinerIndex", async (req, res) => {
  const { table_number, dinerIndex } = req.params;
  const { order } = req.body;
  if (!table_number || !dinerIndex || !order) {
    logger.error("Missing order from body.");
    res.status(400).send({
      message: "Missing order from body.",
    });
  }
  try {
    const individualOrder = await FrontendCallsController.createIndividualOrder(
      table_number,
      dinerIndex,
      order
    );
    logger[individualOrder.responseType](individualOrder.message);
    return res
      .status(individualOrder.status)
      .json({ [individualOrder.responseType]: individualOrder.message });
  } catch (error) {
    logger.error(
      `Error in route 'frontendCalls POST/:table_number/:dinerIndex'. ${error}`
    );
    return res.status(500).send("Internal server error.");
  }
});

export default router;
