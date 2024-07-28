import FrontendCallsController from '../controllers/frontendCalls.controller.js'
import { Router } from 'express'

const router = Router()

router.post('/ready', FrontendCallsController.setReady)

export default router
