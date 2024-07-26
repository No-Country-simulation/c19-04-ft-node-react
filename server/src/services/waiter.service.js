import logger from "../utils/logger.js";
import { waitersRef } from "../utils/firebaseRefs.js";
import { get, set, ref } from "firebase/database";
import database from "../connections/firebase.js";
import { saveOrder } from "./order.service.js";

export const createWaiter = async (username) => {
  if (!username) {
    logger.error("Missing required fields.");
    return res.status(400).json({ error: "Missing required fields." });
  }
  try {
    const waitersSnapshot = await get(waitersRef);
    const waitersData = waitersSnapshot.val();
    await set(waitersRef, {
      ...waitersData,
      [username]: {
        assignedTables: "",
        requestedBy: "",
      },
    });
    logger.info(`Waiter ${username} successfully added to /waiters`);
  } catch (error) {
    logger.error(`Error in waiter.service.createWaiter: ${error}`);
    return new Error("Internal Server Error");
  }
};

export const assignTable = async (username, tableNumber) => {
  try {
    const waiterRef = ref(database, `/waiters/${username}`);
    const waiterSnapshot = await get(waiterRef);
    const waiterData = waiterSnapshot.val();
    if (!waiterData) {
      logger.error(`The waiter ${username} does not exist.`);
      return false;
    }
    await set(waiterRef, {
      ...waiterData,
      assignedTables: [...waiterData.assignedTables, `Table ${tableNumber}`],
    });
    logger.info(`Table ${tableNumber} has been assigned to ${username}`);
    return true;
  } catch (error) {
    logger.error(`Error in waiter.service.assignTable: ${error}`);
    throw new Error(`Internal server error.`);
  }
};

export const requestWaiter = async (req, res) => {
  const { username } = req.params;
  const { requestedBy } = req.body;
  if (!username || !requestedBy) {
    logger.error("Missing required fields.");
    return res.status(400).json({ error: "Missing required fields." });
  }
  try {
    const waiterRef = ref(database, `/waiters/${username}`);
    const waiterSnapshot = await get(waiterRef);
    const waiterData = waiterSnapshot.val();
    if (!waiterData) {
      logger.error(`The waiter ${username} does not exist.`);
      return res
        .status(404)
        .json({ error: `The waiter ${username} does not exist.` });
    }
    if (
      waiterData.requestedBy &&
      waiterData.requestedBy.find((key) => key == requestedBy)
    ) {
      logger.warn("Waiter was already requested");
      return res.status(400).json({ error: "Waiter was already requested" });
    }
    await set(waiterRef, {
      ...waiterData,
      requestedBy: [...(waiterData.requestedBy || []), requestedBy],
    });
    logger.info(`Waiter ${username} has been requested by ${requestedBy}`);
    return res.status(200).json({
      message: `Waiter ${username} has been requested by ${requestedBy}`,
    });
  } catch (error) {
    logger.error(`Error in waiter.service.requestWaiter: ${error}`);
    res.status(500).send("Internal Server Error");
  }
};

export const requestAttended = async (req, res) => {
  const { username } = req.params;
  const { requestAttended } = req.body;
  try {
    const waiterRef = ref(database, `/waiters/${username}`);
    const waiterSnapshot = await get(waiterRef);
    const waiterData = waiterSnapshot.val();
    if (!waiterData) {
      logger.error(`The waiter ${username} does not exist.`);
      return res
        .status(404)
        .json({ error: `The waiter ${username} does not exist.` });
    }
    if (
      waiterData.requestedBy &&
      !waiterData.requestedBy.find((key) => key == requestAttended)
    ) {
      logger.warn(`Waiter was not requested by ${requestAttended}`);
      return res
        .status(400)
        .json({ error: `Waiter was not requested by ${requestAttended}.` });
    }
    const requests = waiterData.requestedBy;
    if (!requests) {
      logger.error(`Waiter had no request to attend.`);
      return res
        .status(400)
        .json({ error: "Waiter had no request to attend." });
    }
    const filterRequests = requests.filter((key) => key !== requestAttended);
    await set(waiterRef, {
      ...waiterData,
      requestedBy: filterRequests,
    });
    logger.info(`Request ${requestAttended} has been attended`);
    return res
      .status(200)
      .json({ message: `Request ${requestAttended} has been attended` });
  } catch (error) {
    logger.error(`Error in waiter.service.requestAttended: ${error}`);
    res.status(500).send("Internal Server Error");
  }
};

// Cierra la mesa y guarda la orden en mongo y limpia la mesa de firebase y deja "isActive" en false
export const closeTable = async (req, res) => {
  const { tableNumber } = req.params;
  const { order } = req.body;
  if (!tableNumber || !order) {
    logger.error("Missing required fields");
    return res.status(400).send("Missing required fields");
  }
  try {
    await saveOrder(tableNumber, order);
    const tableRef = ref(database, `/tables/table_${tableNumber}`);
    await set(tableRef, {
      isActive: false,
    });
    logger.info(`Table ${tableNumber} has been closed`);
    return res
      .status(200)
      .json({ message: `Table ${tableNumber} has been closed` });
  } catch (error) {
    logger.error(`Error in waiter.service.closeTable: ${error}`);
    res.status(500).send("Internal Server Error");
  }
};
