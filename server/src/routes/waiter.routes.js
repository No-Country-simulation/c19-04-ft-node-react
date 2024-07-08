//POST LLAMAR MEZERO
import { Router } from 'express'
import WaiterController from '../controllers/waiter.controller.js'

const router = Router()

router.patch('/callWaiter/:tableNumber', WaiterController.sendMessage)
router.get('/msgWaiter/:waiterUsername', WaiterController.getRequestedTables)

export default router



//GET ORDEN LISTA



//POST ORDEN

//PATCH Abrir mesa