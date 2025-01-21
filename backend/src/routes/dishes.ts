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
import { admin, protect } from "../middlewares/auth";

router.post("/", uploadImage.single("image"), addDish);
router.get("/", getDishes);
router.get("/name/:name", getDishByName);
router.get("/:id", getDishById);
router.put("/:id", protect, admin, uploadImage.single("image"), updateDishById);
router.put("/name/:name", uploadImage.single("image"), updateDishByName);
router.delete("/:id", deleteDishById);
router.delete("/name/:name", deleteDishByName);

export default router;
