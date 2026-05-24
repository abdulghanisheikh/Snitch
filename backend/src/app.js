import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("server is running");
});

export default app;