import { fileURLToPath } from "url";
import OrderModel from "../models/orders.model.js";
import logger from "../utils/logger.js";
import fs from "fs";
import path from "path";
import { ordersRef } from "../utils/firebaseRefs.js";
import { get, set, ref } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import MenuController from "../controllers/menu.controller.js";
import database from "../connections/firebase.js";
export const getAllOrders = async (req, res) => {
  try {
    const allOrders = await OrderModel.find();
    logger.info(`All orders: ${allOrders}`);
    return res.status(200).json(allOrders);
  } catch (error) {
    logger.error(`Error in order.service.getAllOrders: ${error}`);
    res.status(500).send("Internal Server Error");
  }
};

export const saveOrder = async (req, res) => {
  // Para MONGO
  try {
    const { table } = req.body;
    if (!table) {
      logger.error("Missing required fields");
      return res.status(400).json({ message: "Missing required fields" });
    }
    const fileName = fileURLToPath(import.meta.url);
    const dirname = path.dirname(fileName);
    const orderCountFile = path.resolve(
      `${dirname}../../../data/orderCount.json`
    );
    const orderCountJSON = fs.readFileSync(
      orderCountFile,
      "utf-8",
      (err, data) => {
        if (err) {
          logger.error(err);
          return;
        }
        logger.info(data);
      }
    );
    const { orderCount } = JSON.parse(orderCountJSON);
    const order = await OrderModel.create({
      orderNumber: orderCount + 1,
      table: table._id,
    });
    fs.writeFile(
      orderCountFile,
      JSON.stringify({ orderCount: orderCount + 1 }),
      (err) => {
        if (err) throw err;
      }
    );
    logger.info(`Order ${order} saved successfully.`);
    return res.status(201).json(order);
  } catch (error) {
    logger.error(`Error in order.service.saveOrder: ${error}`);
    res.status(500).send("Internal Server Error");
  }
};

export const createOrder = async (req, res) => {
  // Para FIREBASE
  const { to, tableNumber, order } = req.body; //order es un array de ids de ObjectId de Mongo
  if (!to || !tableNumber || !order)
    return res.status(400).json({ error: "Missing required fields." });
  try {
    const allOrdersSnapshot = await get(ordersRef);
    const allOrdersData = allOrdersSnapshot.val();
    const pendingRef = ref(database, `/orders/${to}/pending`);
    const pendingSnapshot = await get(pendingRef);
    const pendingData = pendingSnapshot.val();
    const orderedDishes = await MenuController.getDishesByIds(
      order.map((id) => id)
    );
    const finalOrder = orderedDishes.map((dish) => {
      return {
        dishNumber: dish.dishNumber,
        title: dish.title,
        img: dish.img || "",
        notes: dish.notes || "",
      };
    });
    const orderId = uuidv4();
    await set(pendingRef, {
      ...pendingData,
      [orderId]: {
        orderNumber: allOrdersData.lastOrder + 1,
        tableNumber,
        order: finalOrder,
      },
    });
    logger.info(`Order created successfully`);
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    logger.error(`Error in order.service.createOrder: ${error}`);
    res.status(500).send("Internal Server Error");
  }
};

export const getPendingOrders = async (req, res) => {
  try {
    const pendingOrders = await OrderModel.find()
      .where("status")
      .equals("pending")
      .exec();
    logger.info(`All pending orders: ${pendingOrders}`);
    return res.status(200).json(pendingOrders);
  } catch (error) {
    logger.error(`Error in order.service.allPendingOrders: ${error}`);
    res.status(500).send("Internal Server Error");
  }
};

export const updateStatus = async (req, res) => {
  const { orderId } = req.params;
  const { from, updateTo } = req.body;
  try {
    if (!orderId || !updateTo) {
      logger.error(`Missing required fields.`);
      return res.status(400).send("Missing required fields.");
    }
    const initialOrderRef = ref(
      database,
      `/orders/${from == "bar" ? "bar" : "kitchen"}/${
        updateTo == "inProgress" ? "pending" : "inProgress"
      }`
    );
    const finalOrderRef = ref(
      database,
      `/orders/${from == "bar" ? "bar" : "kitchen"}/${
        updateTo == "inProgress" ? "inProgress" : "ready"
      }`
    );
    const initialSnapshot = await get(initialOrderRef);
    const initialData = initialSnapshot.val();
    const finalSnapshot = await get(finalOrderRef);
    const finalData = finalSnapshot.val() || {};
    const orderExists =
      initialData && Object.keys(initialData).find((key) => key == orderId);
    if (!orderExists) {
      logger.error("The order to update does not exist.");
      return res
        .status(404)
        .json({ error: "The order to update does not exist." });
    }
    let newInitialData = {};
    for (const key in initialData) {
      if (key == orderId) {
        finalData[key] = initialData[key];
      } else {
        newInitialData = {
          ...newInitialData,
          [key]: initialData[key],
        };
      }
    }
    await set(initialOrderRef, newInitialData);
    await set(finalOrderRef, {
      ...finalData,
      [orderId]: initialData[orderId],
    });
    logger.info(
      `The order status has been successfully updated to ${updateTo}`
    );
    return res.status(200).json({
      message: `The order status has been successfully updated to ${updateTo}`,
    });
  } catch (error) {
    logger.error(`Error in order.service.updateStatus: ${error}`);
    res.status(500).send("Internal Server Error");
  }
};

export const getReadyOrders = async (req, res) => {
  try {
    const readyOrders = await OrderModel.find()
      .where("status")
      .equals("ready")
      .exec();
    logger.info(`All ready orders: ${readyOrders}`);
    return res.status(200).json(readyOrders);
  } catch (error) {
    logger.error(`Error in order.service.getReadyOrders: ${error}`);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      logger.error(`Missing required orderId.`);
      return res.status(400).send("Missing required orderId.");
    }
    const orderToDelete = await OrderModel.findByIdAndDelete(orderId);
    if (!orderToDelete) {
      logger.error(`Order ${orderId} not found.`);
      return res.status(404).send("Order not found.");
    }
    logger.info(`Order ${orderToDelete} deleted successfully.`);
    return res.status(200).json({
      message: `Order ${orderId} deleted successfully.`,
      orderDeleted: orderToDelete,
    });
  } catch (error) {
    logger.error(`Error in order.service.getReadyOrders: ${error}`);
    res.status(500).send("Internal Server Error");
  }
};
