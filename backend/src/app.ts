import express, { Application } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/dbConfig";
import dotenv from "dotenv";
import dishRoutes from './routes/dishes';
import opinionsRoutes from './routes/opinions';

import menuRoutes from "./routes/menu";

import { errorHandler } from "./middlewares/error";

import authRoute from "./routes/auth";

const app: Application = express();

connectDB();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.use(errorHandler);

app.use('/api/dishes', dishRoutes);
app.use('/api/opinions', opinionsRoutes);
app.use("/menu", menuRoutes);

export default app;
