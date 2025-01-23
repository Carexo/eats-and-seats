import {Router} from "express";
import {
    createReservation,
    deleteReservation,
    getAllReservations,
    getReservationById,
    updateReservation
} from "../controllers/reservation";

const router = Router();

router.post("/", createReservation);

router.get("/", getAllReservations);

router.get("/:id", getReservationById);

router.put("/:id", updateReservation);

router.delete("/:id", deleteReservation);

export default router;

