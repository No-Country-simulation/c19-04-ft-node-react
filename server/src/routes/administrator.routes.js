import AuthController from "../controllers/auth.controller.js";
import IngredientsController from "../controllers/ingredients.controller.js";
import { Router } from "express";
import WaiterController from "../controllers/waiter.controller.js";
import AdminController from "../controllers/admin.controller.js";

const router = Router();

// TRAER TODOS LOS MESEROS
router.get("/waiters", WaiterController.getWaiters);

// TRAER INFORMACION DE USUARIO LOGUEADO
router.get("/user", AuthController.getUser);

// TRAER INFORMACION DE USUARIO LOGUEADO
router.post("/allUsers", AuthController.getAllUsers);

//POST ADD WAITER / TABLE / KITCHEN / ADMIN
router.post("/register", AuthController.signUp);

//POST INGREDIENTES
router.post("/ingredients", IngredientsController.addIngredient);

//GET INGREDIENTES
router.get("/ingredients", IngredientsController.getIngredient);

//DELETE INGREDIENTES
router.delete("/ingredients/:nombre", IngredientsController.removeIngredient);

//POST ASSIGN TABLES TO WAITERS
router.patch("/assignTables/:waiterUsername", WaiterController.assignTables);

//POST MENU
router.post("/menu", AdminController.createMenu);

//GET MENU
router.get("/menu", AdminController.getMenu);

//PATCH MENU
router.patch("/menu/:id", AdminController.updateMenu);

export default router;
