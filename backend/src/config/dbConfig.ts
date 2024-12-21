import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        const uri = process.env.MONGO_URI || "mongodb://root:password@localhost:27017/";

        await mongoose.connect(uri);

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;
