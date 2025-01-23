import { Router } from "express";
import {
    createReservation,
    deleteReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
} from "../controllers/reservation";
import { protectAdmin } from "../middlewares/auth";

const router = Router();

router.post("/", createReservation);

router.get("/", protectAdmin, getAllReservations);

router.get("/:id", protectAdmin, getReservationById);

router.put("/:id", protectAdmin, updateReservation);

router.delete("/:id", protectAdmin, deleteReservation);

export default router;
