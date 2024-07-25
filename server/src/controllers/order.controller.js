import {
  saveOrder,
  getPendingOrders,
  getAllOrders,
  getReadyOrders,
  updateStatus,
  deleteOrder,
  createOrder,
} from "../services/order.service.js";

const OrderController = {
  saveOrder,
  createOrder,
  getPendingOrders,
  getAllOrders,
  getReadyOrders,
  updateStatus,
  deleteOrder,
};

export default OrderController;
