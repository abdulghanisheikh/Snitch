import mongoose from "mongoose";
import {appConfig} from "./config.js";

const connectToDB = () => {
    if(!appConfig.MONGO_URI) {
        throw new Error("MONGO_URI is not defined in environment variables");
    }

    mongoose.connect(appConfig.MONGO_URI)
    .then(() => {
       console.log("Database connected");
    })
    .catch(() => {
        console.log("Database connection failed");
    });
}

export default connectToDB;