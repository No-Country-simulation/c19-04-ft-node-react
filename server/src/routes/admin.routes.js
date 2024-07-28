import { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'
import IngredientsController from '../controllers/ingredients.controller.js'
import AdminController from '../controllers/admin.controller.js'
import MenuController from '../controllers/menu.controller.js'

const router = Router()

//POST ADD WAITER / TABLE / KITCHEN / ADMIN
router.post('/register', AuthController.signUp)

//POST INGREDIENTES
router.post('/ingredients', IngredientsController.addIngredient)

//GET INGREDIENTES
router.get('/ingredients', IngredientsController.getIngredient)

//DELETE INGREDIENTES
router.delete('/ingredients/:nombre', IngredientsController.removeIngredient)

//POST MENU
router.post('/menu', AdminController.createMenu)

//GET MENU
router.get('/menu', MenuController.getMenu)

//PATCH MENU
router.patch('/menu/:id', AdminController.updateMenu)

export default router
