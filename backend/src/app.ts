import express, { Application } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/dbConfig";
import dishRoutes from "./routes/dishes";
import opinionsRoutes from "./routes/opinions";

import { errorHandler } from "./middlewares/error";

import authRoute from "./routes/auth";
import { protect } from "./middlewares/auth";

const app: Application = express();

connectDB();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);

app.use("/api/dishes", dishRoutes);
app.use("/api/opinions", opinionsRoutes);

app.use(errorHandler);

export default app;
