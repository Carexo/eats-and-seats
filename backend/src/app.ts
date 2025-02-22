import express, { Application } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./config";

import connectDB from "./config/dbConfig";
import dishRoutes from "./routes/dishes";
import opinionsRoutes from "./routes/opinions";
import userRoutes from "./routes/users";
import cartRoutes from "./routes/cart";
import orderRoutes from "./routes/order";
import reservationRoutes from "./routes/reservation";

import { errorHandler } from "./middlewares/error";

import authRoute from "./routes/auth";

const app: Application = express();

connectDB();

app.use(
    cors({
        origin: config.corsOrigin,
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
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/reservation", reservationRoutes);

app.use(errorHandler);

export default app;
