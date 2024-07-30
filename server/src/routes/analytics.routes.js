import { Router } from 'express'
import AnalyticsController from '../controllers/analytics.controller.js'

const router = Router()

router.get('/', AnalyticsController.analyticsService)

export default router
