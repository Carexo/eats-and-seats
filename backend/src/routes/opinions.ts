import { Router } from "express";
import { addOpinion, getOpinionsByDishId, deleteOpinion, getOpinions } from "../controllers/opinions";
import {protect, protectAdmin} from "../middlewares/auth";

const router = Router();

router.get("/", getOpinions);

router.post("/add", protect, addOpinion);

router.get("/:dish_id", getOpinionsByDishId);

router.delete("/:opinion_id", protectAdmin, deleteOpinion);

export default router;
