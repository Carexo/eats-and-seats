import { Router } from "express";
import {
    addOpinion,
    getOpinionsByDishId,
    deleteOpinion,
    getOpinions,
    getAverageRating,
    getOpinionsByUserId, updateOpinion
} from "../controllers/opinions";
import {protect} from "../middlewares/auth";


const router = Router();

router.get("/", getOpinions);

router.get("/user", protect, getOpinionsByUserId);

router.post("/add", protect, addOpinion);

router.get("/:dish_id", getOpinionsByDishId);

router.delete("/:opinion_id", protect, deleteOpinion);

router.get("/average/:dish_id", getAverageRating);

router.patch("/:opinion_id", protect, updateOpinion);

export default router;
