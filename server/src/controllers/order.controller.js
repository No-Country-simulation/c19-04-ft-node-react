import database from "../connections/firebase.js";
import { ref, get, set } from "firebase/database";
import { ordersRef } from "../utils/firebaseRefs.js";
import OrderModel from "../models/orders.model.js";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import logger from "../utils/logger.js";
import MenuController from "../controllers/menu.controller.js";

class OrderController {
  static async save(tableNumber, order) {
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
      logger.error(`Error in order.controller.save: ${error}`);
      throw new Error("Internal server error.");
    }
  }
  static async create(tableNumber, order) {
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
      logger.error(`Error in order.controller.create: ${error}`);
      throw new Error(`Error in order.controller.create: ${error.message}`);
    }
  }
  static async getAll() {
    try {
      const allOrdersSnapshot = await get(ordersRef);
      const allOrders = allOrdersSnapshot.val();
      return {
        status: 200,
        responseType: "info",
        message: "All orders",
        result: allOrders,
      };
    } catch (error) {
      logger.error(`Error in order.controller.getAll: ${error}`);
      throw new Error(`Error in order.controller.getAll: ${error.message}`);
    }
  }
  static async getByStatus(status, to) {
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
      logger.error(`Error in order.controller.getByStatus: ${error}`);
      throw new Error(
        `Error in order.controller.getByStatus: ${error.message}`
      );
    }
  }
  static async updateStatus(orderId, updateTo) {
    try {
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
        return {
          status: 404,
          responseType: "error",
          message: "The order to update does not exist.",
        };
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
      return {
        status: 200,
        responseType: "info",
        message: `The order status has been successfully updated to ${updateTo}`,
      };
    } catch (error) {
      logger.error(`Error in order.controller.updateStatus: ${error}`);
      throw new Error(
        `Error in order.controller.updateStatus: ${error.message}`
      );
    }
  }
  static async delete(orderId) {
    try {
      const orderToDelete = await OrderModel.findByIdAndDelete(orderId);
      if (!orderToDelete) {
        logger.error("Order not found.");
        return {
          status: 404,
          responseType: "error",
          message: "Order not found.",
        };
      }
      return {
        status: 200,
        responseType: "info",
        message: `Order ${orderId} has been successfully deleted.`,
      };
    } catch (error) {
      logger.error(`Error in order.controller.delete: ${error}`);
      throw new Error(`Error in order.controller.delete: ${error.message}`);
    }
  }
}

export default OrderController;
