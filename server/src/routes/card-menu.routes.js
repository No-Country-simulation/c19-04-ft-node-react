import { Router } from 'express'
import CardMenuController from '../controllers/card-menu.controller.js'

const router = Router()

//GET de card-menu
router.get('/card-menu', CardMenuController.getCardMenu)

//PATCH de card-menu

export default router
