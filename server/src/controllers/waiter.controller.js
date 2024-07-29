import logger from "../utils/logger.js";
import database from "../connections/firebase.js";
import { ref, get, set } from "firebase/database";
import { waitersRef } from "../utils/firebaseRefs.js";
import OrderController from "./order.controller.js";

class WaiterController {
  static async createWaiter(username) {
    try {
      const waitersSnapshot = await get(waitersRef);
      const waitersData = waitersSnapshot.val() || {};
      await set(waitersRef, {
        ...waitersData,
        [username]: {
          assignedTables: "",
          requestedBy: "",
        },
      });
      return {
        status: 201,
        responseType: "info",
        message: `Waiter ${username} successfully added to /waiters`,
      };
    } catch (error) {
      logger.error(`Error in WaiterController.createWaiter: ${error}`);
      throw new Error("Internal server error.");
    }
  }
  static async assignTable(username, tableNumber) {
    try {
      const waiterRef = ref(database, `/waiters/${username}`);
      const waiterSnapshot = await get(waiterRef);
      const waiterData = waiterSnapshot.val();
      if (!waiterData) {
        logger.error(`The waiter ${username} does not exist.`);
        return {
          status: 404,
          responseType: "error",
          message: `The waiter ${username} does not exist.`,
        };
      }
      await set(waiterRef, {
        ...waiterData,
        assignedTables: [...waiterData.assignedTables, `Table ${tableNumber}`],
      });
      return {
        status: 200,
        responseType: "info",
        message: `Table ${tableNumber} assigned to waiter ${username}`,
      };
    } catch (error) {
      logger.error(`Error in WaiterController.assignTable: ${error}`);
      throw new Error("Internal server error.");
    }
  }
  static async requestWaiter(username, requestedBy) {
    try {
      const waiterRef = ref(database, `/waiters/${username}`);
      const waiterSnapshot = await get(waiterRef);
      const waiterData = waiterSnapshot.val();
      if (!waiterData) {
        logger.error(`The waiter ${username} does not exist.`);
        return {
          status: 404,
          responseType: "error",
          message: `The waiter ${username} does not exist.`,
        };
      }
      if (
        waiterData.requestedBy &&
        waiterData.requestedBy?.find((key) => key === requestedBy)
      ) {
        logger.warn("Waiter was already requested");
        return {
          status: 400,
          responseType: "warn",
          message: "Waiter was already requested",
        };
      }
      await set(waiterRef, {
        ...waiterData,
        requestedBy: [...(waiterData.requestedBy || []), requestedBy],
      });
      logger.info(`Waiter ${username} has been requested by ${requestedBy}`);
      return {
        status: 200,
        responseType: "info",
        message: `Waiter ${username} has been requested by ${requestedBy}`,
      };
    } catch (error) {
      logger.error(`Error in WaiterController.requestWaiter: ${error}`);
      throw new Error("Internal server error.");
    }
  }
  static async attendRequest(username, requestAttended) {
    try {
      const waiterRef = ref(database, `/waiters/${username}`);
      const waiterSnapshot = await get(waiterRef);
      const waiterData = waiterSnapshot.val();
      if (!waiterData) {
        logger.error(`The waiter ${username} does not exist.`);
        return {
          status: 404,
          responseType: "error",
          message: `The waiter ${username} does not exist.`,
        };
      }
      if (
        waiterData.requestedBy &&
        !waiterData.requestedBy.find((key) => key === requestAttended)
      ) {
        logger.warn(`Waiter was not requested by ${requestAttended}`);
        return {
          status: 400,
          responseType: "warn",
          message: `Waiter was not requested by ${requestAttended}`,
        };
      }
      const requests = waiterData.requestedBy;
      if (!requests) {
        logger.error("Waiter had no request to attend.");
        return {
          status: 400,
          responseType: "error",
          message: "Waiter had no request to attend.",
        };
      }
      const filterRequests = requests.filter((key) => key !== requestAttended);
      await set(waiterRef, {
        ...waiterData,
        requestedBy: filterRequests,
      });
      logger.info(`Request ${requestAttended} has been attended`);
      return {
        status: 200,
        responseType: "info",
        message: `Request ${requestAttended} has been attended`,
      };
    } catch (error) {
      logger.error(`Error in WaiterController.attendRequest: ${error}`);
      throw new Error("Internal server error.");
    }
  }
  static async closeTable(tableNumber, order) {
    try {
      awaiOrderController.saveOrd(tableNumber, order);
      const tableRef = ref(database, `/tables/table_${tableNumber}`);
      await set(tableRef, {
        isActive: false,
      });
      return {
        status: 200,
        responseType: "info",
        message: `Table ${tableNumber} has been closed.`,
      };
    } catch (error) {
      logger.error(`Error in WaiterController.closeTable: ${error}`);
      throw new Error("Internal server error.");
    }
  }
}

export default WaiterController;
