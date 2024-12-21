import express, { Application } from "express";
import morgan from "morgan";
import connectDB from "./config/dbConfig";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

connectDB();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
