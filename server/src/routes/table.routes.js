import { Router } from 'express'
import TableController from '../controllers/table.controller.js'

const router = Router()

router.post('/tableQR', TableController.createTable)

router.get('/tableQR/:tableNumber', TableController.getTable)

export default router
