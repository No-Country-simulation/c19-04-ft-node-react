import AuthController from "../controllers/auth.controller.js";
import IngredientsController from "../controllers/ingredients.controller.js";
import { Router } from "express";
import WaiterController from "../controllers/waiter.controller.js";
import AdminController from "../controllers/admin.controller.js";

const router = Router();
//POST ADD WAITER / TABLE / KITCHEN / ADMIN
router.get("/user", AuthController.getUser);

router.post("/register", AuthController.signUp);

//POST INGREDIENTES
router.post("/ingredients", IngredientsController.addIngredient);

//GET INGREDIENTES
router.get("/ingredients", IngredientsController.getIngredient);

//DELETE INGREDIENTES
router.delete("/ingredients/:nombre", IngredientsController.removeIngredient);

//POST ASSIGN TABLES TO WAITERS
router.patch("/assignTables/:userMozo", WaiterController.assignTables);

//POST MENU
router.post("/menu", AdminController.createMenu);

//GET MENU
router.get("/menu", AdminController.getMenu);

//PATCH MENU
router.patch("/menu/:id", AdminController.updateMenu);

export default router;
