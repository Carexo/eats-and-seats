import Router from "express";
import { checkStatus, handleRefreshToken, login, logout, register } from "../controllers/auth";

const router = Router();

router.post("/login", login);

router.post("/register", register);

router.get("/logout", logout);

router.get("/refresh", handleRefreshToken);

router.get("/status", checkStatus);

export default router;
