import {
  saveOrder,
  getPendingOrders,
  getAllOrders,
  getInProgressOrders,
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
  getInProgressOrders,
  getReadyOrders,
  updateStatus,
  deleteOrder,
};

export default OrderController;
