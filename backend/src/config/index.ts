import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const config = {
    production: isProduction,
    mongoURI: process.env.MONGO_URI!!,
    secrets: {
        jwt: process.env.JWT_SECRET!!,
        jwtExp: 30 * 60,
    },
};

export default config;
