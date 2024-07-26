import WaiterModel from "../models/waiter.model.js";
import logger from "../utils/logger.js";
import { waitersRef } from "../utils/firebaseRefs.js";
import { get, set, ref } from "firebase/database";
import database from "../connections/firebase.js";
export const createWaiter = async (req, res) => {
  const { username, password, name } = req.body;
  if (!username || !password || !name) {
    logger.error("Missing required fields.");
    return res.status(400).json({ error: "Missing required fields." });
  }
  try {
    // Create Waiter in Mongo
    const waitersSnapshot = await get(waitersRef);
    const waitersData = waitersSnapshot.val();
    await set(waitersRef, {
      ...waitersData,
      [username]: {
        assignedTables: {
          0: "Acá se le asignan las mesas al mozo",
        },
        requestedBy: {
          0: "Acá aparecen quienes hayan solicitado al mozo",
        },
      },
    });
    logger.info(`Waiter ${name} successfully added to /waiters`);
    return res
      .status(201)
      .json({ message: `Waiter ${name} successfully added to /waiters` });
  } catch (error) {
    logger.error(`Error in waiter.service.createWaiter: ${error}`);
    res.status(500).send("Internal Server Error");
  }
};

export const assignTable = async (username, tableNumber) => {
  try {
    const waiterRef = ref(database, `/waiters/${username}`);
    const waiterSnapshot = await get(waiterRef);
    const waiterData = waiterSnapshot.val();
    await set(waiterRef, {
      ...waiterData,
      assignedTables: [...waiterData.assignedTables, `Table ${tableNumber}`],
    });
    logger.info(`Table ${tableNumber} has been assigned to ${username}`);
    return res.status(200).json({
      message: `Table ${tableNumber} has been assigned to ${username}`,
    });
  } catch (error) {
    logger.error(`Error in waiter.service.assignTable: ${error}`);
    res.status(500).send("Internal Server Error");
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
    if (waiterData.requestedBy.find((key) => key == requestedBy)) {
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
    if (!waiterData.requestedBy.find((key) => key == requestAttended)) {
      logger.warn(`Waiter was not requested by ${requestAttended}`);
      return res
        .status(400)
        .json({ error: `Waiter was not requested by ${requestAttended}.` });
    }
    const filterRequests = waiterData.requestedBy.filter(
      (key) => key !== requestAttended
    );
    await set(waiterRef, {
      ...waiterData,
      requestedBy: filterRequests,
    });
    console.log(filterRequests);
    logger.info(`Request ${requestAttended} has been attended`);
    return res
      .status(200)
      .json({ message: `Request ${requestAttended} has been attended` });
  } catch (error) {
    logger.error(`Error in waiter.service.requestAttended: ${error}`);
    res.status(500).send("Internal Server Error");
  }
};
