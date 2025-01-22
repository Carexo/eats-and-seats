import express from "express";
import {
    addDish,
    getDishes,
    getDishByName,
    getDishById,
    updateDishById,
    deleteDishById,
    updateDishByName,
    deleteDishByName,
    getCategories,
    getFilteredDishes,
} from "../controllers/dishes";

const router = express.Router();
import { optimizeImage, uploadImage } from "../middlewares/uploadImage";
import { protectAdmin } from "../middlewares/auth";

router.post("/", protectAdmin, uploadImage.single("image"), optimizeImage, addDish);
router.get("/", getDishes);
router.get("/categories", getCategories);
router.get("/filter", getFilteredDishes);
router.get("/name/:name", getDishByName);
router.get("/:id", getDishById);
router.put("/:id", protectAdmin, uploadImage.single("image"), optimizeImage, updateDishById);
router.put("/name/:name", protectAdmin, uploadImage.single("image"), optimizeImage, updateDishByName);
router.delete("/:id", protectAdmin, deleteDishById);
router.delete("/name/:name", protectAdmin, deleteDishByName);

export default router;
