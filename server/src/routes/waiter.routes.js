import { Router } from 'express'
import WaiterController from '../controllers/waiter.controller.js'
import VerifyToken from '../middlewares/jwt.middleware.js'

const router = Router()

router.post('/create', VerifyToken, WaiterController.createWaiter)
router.post('/requestWaiter/:username', WaiterController.requestWaiter)
router.post('/attendRequest/:username', WaiterController.requestAttended)
router.post(
	'/closeTable/:tableNumber',
	VerifyToken,
	WaiterController.closeTable,
)

export default router
