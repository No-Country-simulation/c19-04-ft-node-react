import { Router } from 'express'
import WaiterController from '../controllers/waiter.controller.js'

const router = Router()

router.patch('/callWaiter/:tableNumber', WaiterController.sendMessage)
router.get('/msgWaiter/:waiterUsername', WaiterController.getRequestedTables)
router.delete('/deleteMsg/:tableNumber', WaiterController.deleteRequestTable)

export default router
