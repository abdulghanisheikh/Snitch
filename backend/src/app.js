import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
    credentials: true
}));

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
    res.status(200).json({message: 'Server is running'});
});

export default app;