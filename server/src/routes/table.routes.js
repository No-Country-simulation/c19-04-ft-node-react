import { Router } from 'express'
import TableController from '../controllers/table.controller.js'
import VerifyToken from '../middlewares/jwt.middleware.js'

const router = Router()

router.post('/tableQR', VerifyToken, TableController.createTable)

router.get('/tableQR/:tableNumber', TableController.getTable)

router.post('/tableQR/joinTable/:tableNumber', TableController.joinTable)

router.post('/assignWaiter/:tableNumber', TableController.assignWaiter)

export default router
