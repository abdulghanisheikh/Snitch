import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { appConfig } from "../configs/app.config.js";

export const authenticateSeller = async(req, res, next) => {
    const token = req.cookies.token;
    try {
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "No token found, Unauthorized"
            });
        }

        const decoded = await jwt.verify(token, appConfig.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if(!user) {
            return res.status(401).json({
                success: false, 
                message: "Unauthorized"
            });
        }

        if(user.role !== "seller") {
            return res.status(401).json({
                success: false,
                message: "Forbidden"
            });
        }

        req.user = decoded;
        next();
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

export const authenticateUser = async(req, res, next) => {
    const token = req.cookies.token;

    try {
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "No token found, Unauthorized"
            });
        }

        const decoded = await jwt.verify(token, appConfig.JWT_SECRET);

        req.user = decoded;
        next();
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
}