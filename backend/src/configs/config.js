import dotenv from "dotenv";
dotenv.config();

export const appConfig = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT
};