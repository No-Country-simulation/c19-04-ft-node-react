import AuthController from "../controllers/auth.controller.js";
import IngredientsController from "../controllers/ingredients.controller.js";

import { Router } from 'express'
const router = Router()
//POST ADD WAITER / TABLE / KITCHEN / ADMIN
router.post('/register', AuthController.signUp)

//POST INGREDIENTES
router.post('/ingredients', IngredientsController.addIngredient)

export default router