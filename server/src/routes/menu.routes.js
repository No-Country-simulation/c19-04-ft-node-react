import { Router } from "express";
import MenuController from "../controllers/menu.controller.js";

const router = Router();

//GET de card-menu
router.get("/", MenuController.getMenu);

//PATCH de card-menu

export default router;
