//POST LLAMAR MEZERO
import { Router } from 'express'
import WaiterController from '../controllers/waiter.controller.js'

const router = Router()

router.post('/callWaiter/:tableNumber', WaiterController.sendMessage)


export default router



//GET ORDEN LISTA



//POST ORDEN

//PATCH Abrir mesa