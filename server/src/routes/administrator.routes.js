import AuthController from '../controllers/auth.controller.js'
import IngredientsController from '../controllers/ingredients.controller.js'
import { Router } from 'express'
import WaiterController from '../controllers/waiter.controller.js'

const router = Router()
//POST ADD WAITER / TABLE / KITCHEN / ADMIN
router.post('/register', AuthController.signUp)

//POST INGREDIENTES
router.post('/ingredients', IngredientsController.addIngredient)

//GET INGREDIENTES
router.get('/ingredients', IngredientsController.getIngredient)

//DELETE INGREDIENTES
router.delete('/ingredients/:nombre', IngredientsController.removeIngredient)

//POST ASSIGN TABLES TO WAITERS
router.patch('/assignTables/:userMozo', WaiterController.assignTables)

export default router
