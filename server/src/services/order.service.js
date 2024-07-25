import { fileURLToPath } from "url";
import OrderModel from "../models/orders.model.js";
import logger from "../utils/logger.js";
import fs from "fs";
import path from "path";
import { ordersRef } from "../utils/firebaseRefs.js";
import { get, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import {} from "../controllers/menu.controller.js";
import MenuController from "../controllers/menu.controller.js";
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
    const ordersSnapshot = await get(ordersRef);
    const ordersData = ordersSnapshot.val();
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
    await set(ordersRef, {
      ...ordersData,
      [to]: {
        ...ordersData[to],
        [orderId]: {
          orderNumber: ordersData.lastOrder + 1,
          tableNumber,
          order: finalOrder,
        },
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
  try {
    const { orderId } = req.params;
    if (!orderId) {
      logger.error(`Missing required orderId.`);
      return res.status(400).send("Missing required orderId.");
    }
    const orderToUpdate = await OrderModel.findByIdAndUpdate(
      orderId,
      {
        status: "ready",
        readyAt: new Date(),
      },
      { new: true }
    );
    if (!orderToUpdate) {
      logger.error(`Order ${orderId} not found.`);
      return res.status(404).send("Order not found.");
    }
    logger.info(`Order ${orderToUpdate} updated successfully.`);
    return res.status(200).json(orderToUpdate);
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
