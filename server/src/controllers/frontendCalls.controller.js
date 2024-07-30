import database from "../connections/firebase.js";
import { ref, get, set } from "firebase/database";
import OrderController from "./order.controller.js";
import logger from "../utils/logger.js";

class FrontendCallsController {
  static async setReady(tableNumber, index, order) {
    try {
      const dinerRef = ref(
        database,
        `/tables/table_${tableNumber}/diners/${index}`
      );
      const dinerSnapshot = await get(dinerRef);
      const dinerData = dinerSnapshot.val();
      if (!dinerData) {
        logger.error("Diner not found");
        return {
          status: 404,
          responseType: "error",
          message: "Diner not found",
        };
      }
      await set(dinerRef, {
        ...dinerData,
        ready: true,
        order,
      });
      await OrderController.createOrder(tableNumber, order);
      logger.info(`Diner ${dinerData.name} is ready.`);
      return {
        status: 200,
        responseType: "info",
        message: `Diner ${dinerData.name} is ready.`,
      };
    } catch (error) {
      logger.error(`Error in FrontendController.setReady: ${error.message}`);
      throw new Error(`Error in FrontendController.setReady: ${error.message}`);
    }
  }
  static async createIndividualOrder(table_number, dinerIndex, order) {
    try {
      const dinerRef = ref(
        database,
        `/tables/${table_number}/diners/${dinerIndex}`
      );
      const dinerSnapshot = await get(dinerRef);
      const dinerData = dinerSnapshot.val();
      if (!dinerData) {
        logger.error("Diner not found");
        return {
          status: 404,
          responseType: "error",
          message: "Diner not found",
        };
      }
      await set(dinerRef, {
        ...dinerData,
        order: [...(dinerData.order || []), ...order],
      });
      await OrderController.createOrder(table_number, order);
      logger.info("Order created successfully.");
      return {
        status: 201,
        responseType: "info",
        message: "Order created successfully.",
      };
    } catch (error) {
      logger.error(
        `Error in FrontendController.createIndividualOrder: ${error.message}`
      );
      throw new Error(
        `Error in FrontendController.createIndividualOrder: ${error.message}`
      );
    }
  }
}

export default FrontendCallsController;
