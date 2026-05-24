import mongoose from "mongoose";
import {appConfig} from "./config.js";

const connectToDB = () => {
    mongoose.connect(appConfig.MONGO_URI)
    .then(() => {
       console.log("Database connected");
    })
    .catch(() => {
        console.log("Database connection failed");
    });
}

export default connectToDB;