import { Router } from "express";
import { addOpinion, getOpinionsByDishId } from "../controllers/opinions";

const router = Router();

router.post("/", addOpinion);

router.get("/:dish_id", getOpinionsByDishId);

export default router;
