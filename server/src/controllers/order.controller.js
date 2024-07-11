import {
	createOrder,
	getPendingOrders,
	getAllOrders,
	getReadyOrders,
	updateStatus,
	deleteOrder,
} from '../services/order.service.js'

const OrderController = {
	createOrder,
	getPendingOrders,
	getAllOrders,
	getReadyOrders,
	updateStatus,
	deleteOrder,
}

export default OrderController
