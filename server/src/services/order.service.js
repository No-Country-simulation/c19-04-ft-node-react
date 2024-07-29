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

export const saveOrder = async (tableNumber, order) => {
  // Para MONGO
  try {
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
    const newOrder = await OrderModel.create({
      orderNumber: orderCount + 1,
      tableNumber: Number.parseInt(tableNumber),
      orderedDishes: order, // Array de Ids de MenuModel
    });
    fs.writeFile(
      orderCountFile,
      JSON.stringify({ orderCount: orderCount + 1 }),
      (err) => {
        if (err) throw err;
      }
    );
    logger.info(
      `Order ${newOrder.orderNumber}, ${newOrder.tableNumber} saved successfully.`
    );
  } catch (error) {
    logger.error(`Error in order.service.saveOrder: ${error}`);
    throw new Error("Internal server error.");
  }
};

export const createOrder = async (tableNumber, order) => {
  // Para FIREBASE
  try {
    const allOrdersSnapshot = await get(ordersRef);
    const allOrdersData = allOrdersSnapshot.val();
    const pendingRef = ref(database, "/orders/pending");
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
        to: dish.to,
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
    const lastOrderRef = ref(database, "/orders/lastOrder");
    await set(lastOrderRef, allOrdersData.lastOrder + 1);
    return {
      status: 201,
      responseType: "info",
      message: "Order created successfully",
    };
  } catch (error) {
    throw new Error(`Error in order.service.createOrder: ${error.message}`);
  }
};

export const getOrderByStatus = async (status, to) => {
  try {
    const statusRef = ref(database, `/orders/${status}`);
    const statusSnapshot = await get(statusRef);
    const statusData = statusSnapshot.val() || [];
    const filteredOrders = Object.values(statusData).map((orderObj) => {
      const menus =
        orderObj.order && orderObj.order.filter((menu) => menu.to === to);
      return { ...orderObj, order: menus };
    });
    if (filteredOrders[0].order.length === 0) {
      logger.warn(`No ${status} orders to ${to}.`);
      return {
        status: 404,
        responseType: "warn",
        message: `No ${status} orders to ${to}.`,
      };
    }
    return {
      status: 200,
      responseType: "info",
      message: `All ${status} orders to ${to}.`,
      result: filteredOrders,
    };
  } catch (error) {
    throw new Error(
      `Error in order.service.getOrderByStatus: ${error.message}`
    );
  }
};

export const getPendingOrders = async (req, res) => {
  const { to } = req.query;
  if (!to) {
    logger.error("Missing required fields.");
    return res.status(400).json({ error: "Missing required fields." });
  }
  try {
    const pendingRef = ref(database, "/orders/pending");
    const pendingSnapshot = await get(pendingRef);
    const pendingData = pendingSnapshot.val() || [];
    const filteredOrders = Object.values(pendingData).map((orderObj) => {
      const menus = orderObj.order.filter((menu) => menu.to === to);
      return { ...orderObj, order: menus };
    });
    if (filteredOrders[0].order.length === 0) {
      logger.warn(`No ready orders to ${to}.`);
      return res.status(200).json({ message: `No ready orders to ${to}.` });
    }
    logger.info(`All pending orders to ${to}: ${filteredOrders}`);
    return res
      .status(200)
      .json({ message: `All pending orders to ${to}.`, filteredOrders });
  } catch (error) {
    logger.error(`Error in order.service.getPendingOrders: ${error}`);
    res.status(500).send("Internal Server Error");
  }
};

export const getInProgressOrders = async (req, res) => {
  const { to } = req.query;
  if (!to) {
    logger.error("Missing required fields.");
    return res.status(400).json({ error: "Missing required fields." });
  }
  try {
    const inProgressRef = ref(database, "/orders/inProgress");
    const inProgressSnapshot = await get(inProgressRef);
    const inProgressData = inProgressSnapshot.val() || [];
    const filteredOrders = Object.values(inProgressData).map((orderObj) => {
      const menus = orderObj.order.filter((menu) => menu.to === to);
      return { ...orderObj, order: menus };
    });
    if (filteredOrders[0].order.length === 0) {
      logger.warn(`No ready orders to ${to}.`);
      return res.status(200).json({ message: `No ready orders to ${to}.` });
    }
    logger.info(`All inProgress orders to ${to}: ${filteredOrders}`);
    return res
      .status(200)
      .json({ message: `All inProgress orders to ${to}.`, filteredOrders });
  } catch (error) {
    logger.error(`Error in order.service.getInProgressOrders: ${error}`);
    res.status(500).send("Internal Server Error");
  }
};

export const getReadyOrders = async (req, res) => {
  const { to } = req.query;
  if (!to) {
    logger.error("Missing required fields.");
    return res.status(400).json({ error: "Missing required fields." });
  }
  try {
    const readyRef = ref(database, "/orders/ready");
    const readySnapshot = await get(readyRef);
    const readyData = readySnapshot.val() || [];
    const filteredOrders = Object.values(readyData).map((orderObj) => {
      const menus = orderObj.order.filter((menu) => menu.to === to);
      return { ...orderObj, order: menus };
    });
    if (filteredOrders[0].order.length === 0) {
      logger.warn(`No ready orders to ${to}.`);
      return res.status(200).json({ message: `No ready orders to ${to}.` });
    }
    logger.info(`All ready orders to ${to}: ${filteredOrders}`);
    return res
      .status(200)
      .json({ message: `All ready orders to ${to}.`, filteredOrders });
  } catch (error) {
    logger.error(`Error in order.service.getReadyOrders: ${error}`);
    res.status(500).send("Internal Server Error");
  }
};

export const updateStatus = async (req, res) => {
  const { orderId } = req.params;
  const { updateTo } = req.body;
  try {
    if (!orderId || !updateTo) {
      logger.error("Missing required fields.");
      return res.status(400).send("Missing required fields.");
    }
    const initialOrderRef = ref(
      database,
      `/orders/${updateTo === "inProgress" ? "pending" : "inProgress"}`
    );
    const finalOrderRef = ref(
      database,
      `/orders/${updateTo === "inProgress" ? "inProgress" : "ready"}`
    );
    const initialSnapshot = await get(initialOrderRef);
    const initialData = initialSnapshot.val();
    const finalSnapshot = await get(finalOrderRef);
    const finalData = finalSnapshot.val() || {};
    const orderExists =
      initialData && Object.keys(initialData).find((key) => key === orderId);
    if (!orderExists) {
      logger.error("The order to update does not exist.");
      return res
        .status(404)
        .json({ error: "The order to update does not exist." });
    }
    let newInitialData = {};
    for (const key in initialData) {
      if (key === orderId) {
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

export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      logger.error("Missing required orderId.");
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
