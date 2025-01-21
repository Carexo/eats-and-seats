import Router from "express";
import { addDishToCart, getCart, removeDishFromCart, updateDishQuantity } from "../controllers/cart";
import { protect } from "../middlewares/auth";

const router = Router();

router.post("/add/:dishId", protect, addDishToCart);

router.get("/", protect, getCart);

router.delete("/remove/:dishId", protect, removeDishFromCart);

router.put("/update/:dishId", protect, updateDishQuantity);

export default router;
