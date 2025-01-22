import { Router } from "express";
import { cancelOrder, createOrder, getOrderById, getUserOrderById, getUserOrders } from "../controllers/order";
import { optionalProtect, protect, protectAdmin } from "../middlewares/auth";

const router = Router();

router.post("/create", optionalProtect, createOrder);

router.get("/user", protect, getUserOrders);

router.get("/user/:id", protect, getUserOrderById);

router.get("/:id", protectAdmin, getOrderById);

router.get("/:id", protect, cancelOrder);

export default router;
