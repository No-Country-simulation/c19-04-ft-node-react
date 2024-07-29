import {
  saveOrder,
  getPendingOrders,
  getAllOrders,
  getInProgressOrders,
  getReadyOrders,
  updateStatus,
  deleteOrder,
  createOrder,
  getOrderByStatus,
} from "../services/order.service.js";

export class ClassOrderController {
  static async saveOrder(tableNumber, order) {
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
  }
  static async getOrderByStatus(status, to) {
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
  }
}

const OrderController = {
  saveOrder,
  createOrder,
  getPendingOrders,
  getAllOrders,
  getInProgressOrders,
  getReadyOrders,
  updateStatus,
  deleteOrder,
  getOrderByStatus,
};

export default OrderController;
