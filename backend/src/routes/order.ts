import { Router } from "express";
import {
    cancelOrder,
    createOrder,
    getOrderById,
    getOrders,
    getUserOrderById,
    getUserOrders,
} from "../controllers/order";
import { optionalProtect, protect, protectAdmin } from "../middlewares/auth";

const router = Router();

router.get("/", protectAdmin, getOrders);

router.get("/cancel/:id", protect, cancelOrder);

router.post("/create", optionalProtect, createOrder);

router.get("/user", protect, getUserOrders);

router.get("/user/:id", protect, getUserOrderById);

router.get("/:id", protectAdmin, getOrderById);

export default router;
