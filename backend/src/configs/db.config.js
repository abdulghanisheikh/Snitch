import mongoose from "mongoose";
import {appConfig} from "./config.js";

const connectToDB = async() => {
    try {
        await mongoose.connect(appConfig.MONGO_URI);
        
        console.log("Database connected");
    } catch(err) {
        console.log("Database connection failed");
    }
}

export default connectToDB;