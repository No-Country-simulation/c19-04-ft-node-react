import { Router } from 'express'
import TableController from '../controllers/table.controller.js'

const router = Router()

router.post('/testqr', TableController.createTable)

router.get('/testget/:tableNumber', TableController.getTable)

export default router
