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
} from "../controllers/dishes";

const router = express.Router();
import { uploadImage } from "../middlewares/uploadImage";
import { protectAdmin } from "../middlewares/auth";

router.post("/", protectAdmin, uploadImage.single("image"), addDish);
router.get("/", getDishes);
router.get("/name/:name", getDishByName);
router.get("/:id", getDishById);
router.put("/:id", protectAdmin, uploadImage.single("image"), updateDishById);
router.put("/name/:name", protectAdmin, uploadImage.single("image"), updateDishByName);
router.delete("/:id", protectAdmin, deleteDishById);
router.delete("/name/:name", protectAdmin, deleteDishByName);

export default router;
