import mongoose from "mongoose";

import config from "./";

const connectDB = async (): Promise<void> => {
    try {
        const uri = config.mongoURI;

        await mongoose.connect(uri);

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;
