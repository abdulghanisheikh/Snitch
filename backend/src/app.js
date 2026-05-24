import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./models/user.model.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.use("/", authRouter);

app.get("/", (req, res) => {
    res.status(200).json({message: "Server is running"});
});

export default app;