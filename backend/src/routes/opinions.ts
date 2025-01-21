import { Router } from "express";
import { addOpinion, getOpinionsByDishId } from "../controllers/opinions";
import { protect } from "../middlewares/auth";

const router = Router();

router.post("/add", protect, addOpinion);

router.get("/:dish_id", getOpinionsByDishId);

export default router;
