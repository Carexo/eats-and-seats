import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const config = {
    production: isProduction,
    mongoURI: process.env.MONGO_URI!!,
    secrets: {
        jwt: process.env.JWT_SECRET!!,
        accessJwtExp: 30 * 60,
        refreshJwtExp: 7 * 24 * 60 * 60,
    },
    constants: {
        JWT_ACCESS: "jwt_access",
        JWT_REFRESH: "jwt_refresh",
    },
};

export default config;
