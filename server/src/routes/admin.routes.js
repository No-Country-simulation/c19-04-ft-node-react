import AdminController from '../controllers/admin.controller.js'
import AuthController from '../controllers/auth.controller.js'
import IngredientsController from '../controllers/ingredients.controller.js'

import { Router } from 'express'
const router = Router()
//POST ADD WAITER / TABLE / KITCHEN / ADMIN
router.post('/register', AuthController.signUp)

//POST INGREDIENTES
router.post('/ingredients', IngredientsController.addIngredient)

//POST MENU
router.post('/menu', AdminController.createMenu)

//GET MENU
router.get('/menu', AdminController.getMenu)

//PATCH MENU
router.patch('/menu/:id', AdminController.updateMenu)
export default router
