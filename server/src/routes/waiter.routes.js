import { Router } from "express";
import WaiterController from "../controllers/waiter.controller.js";

const router = Router();

router.post("/create", WaiterController.createWaiter);
router.post("/requestWaiter/:username", WaiterController.requestWaiter);
router.post("/requestAttended/:username", WaiterController.requestAttended);
router.post("/closeTable/:tableNumber", WaiterController.closeTable);

export default router;
