import { Router } from 'express'
import MenuController from '../controllers/menu.controller.js'

const router = Router()

//GET de menu
router.get('/', MenuController.getMenu)

export default router
