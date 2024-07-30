import AuthController from "../controllers/auth.controller.js";
import IngredientsController from "../controllers/ingredients.controller.js";
import { Router } from "express";
import AdminController from "../controllers/admin.controller.js";
import MenuController from "../controllers/menu.controller.js";

const router = Router();

// TRAER TODOS LOS MESEROS

// TRAER INFORMACION DE USUARIO LOGUEADO
router.get("/user", AuthController.getUser);

// TRAER INFORMACION DE USUARIO LOGUEADO
router.delete("/deleteUser/:userId", AuthController.deleteUser);

// TRAER INFORMACION DE USUARIO LOGUEADO
router.post("/allUsers", AuthController.getAllUsers);

//POST ADD WAITER / TABLE / KITCHEN / ADMIN
router.post("/register", AuthController.signUp);

//POST INGREDIENTES
router.post("/ingredients", IngredientsController.addIngredient);

//GET INGREDIENTES
router.get("/ingredients", IngredientsController.getIngredient);

//DELETE INGREDIENTES
router.delete(
    "/ingredients/delete/:id",
    IngredientsController.removeIngredient
);

//PATCH INGREDIENTES
router.patch("/ingredients/update/:id", IngredientsController.updateIngredient);

//POST MENU
router.post("/menu", AdminController.createMenu);

//GET MENU
router.get("/menu", MenuController.getMenu);

//PATCH MENU
router.patch("/menu/update/:id", AdminController.updateMenu);

//DELETE MENU
router.delete("/menu/delete/:id", AdminController.removeMenu);

//PATCH CLOSE DAY
router.patch("/closeDay", AdminController.closeDay);

export default router;
