import { Router } from 'express'
import TableController from '../controllers/table.controller.js'
import VerifyToken from '../middlewares/jwt.middleware.js'

const router = Router()

router.post('/tableQR', VerifyToken, TableController.createTable)

router.get('/tableQR/:tableNumber', TableController.getTable)

export default router
