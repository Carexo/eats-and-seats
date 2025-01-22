import { Router } from "express";
import {addOpinion, getOpinionsByDishId, deleteOpinion, getOpinions, getAverageRating} from "../controllers/opinions";
import {protect, protectAdmin} from "../middlewares/auth";

const router = Router();

router.get("/", getOpinions);

router.post("/add", protect, addOpinion);

router.get("/:dish_id", getOpinionsByDishId);

router.delete("/:opinion_id", protectAdmin, deleteOpinion);

router.get("/average/:dish_id", getAverageRating);

export default router;
