import express from "express";
import { getUsers, deleteUser, changePassword } from "../controllers/users";
import { protectAdmin, protect } from "../middlewares/auth";

const router = express.Router();

router.get("/", protectAdmin, getUsers);
router.delete("/:id", protectAdmin, deleteUser);
router.patch("/change-password", protect, changePassword);

export default router;
