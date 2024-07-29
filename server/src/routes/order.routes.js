import { Router } from 'express'
import OrderController from '../controllers/order.controller.js'
import VerifyToken from '../middlewares/jwt.middleware.js'

const router = Router()

// POST SAVE FINAL ORDER IN MONGO
router.post('/save', OrderController.saveOrder)

// POST CREATE NEW ORDER IN FIREBASE
router.post('/create', OrderController.createOrder)

// GET ALL ORDERS
router.get('/all', VerifyToken, OrderController.getAllOrders)

// GET PENDING ORDERS
router.get('/pending', VerifyToken, OrderController.getPendingOrders)

// GET IN PROGRESS ORDERS
router.get('/inProgress', VerifyToken, OrderController.getInProgressOrders)

// GET READY ORDERS
router.get('/ready', VerifyToken, OrderController.getReadyOrders)

// UPDATE STATUS
router.patch('/update/:orderId', VerifyToken, OrderController.updateStatus)

// DELETE ORDER
router.delete('/delete/:orderId', VerifyToken, OrderController.deleteOrder)

export default router
