import express from "express";
import {
    getUsers,
    deleteUser, changePassword,
} from "../controllers/users";

const router = express.Router();

router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.patch(":username", changePassword)

export default router;