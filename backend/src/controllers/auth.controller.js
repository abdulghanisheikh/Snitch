import { appConfig } from "../configs/config.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const sendTokenResponse = async({user, res, message}) => {
    const token = await jwt.sign({
        id: user._id
    }, appConfig.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("token", token);

    res.status(200).json({
        success: true,
        message,
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            contact: user.contact,
            role: user.role
        }
    });
}

export const registerUser = async(req, res) => {
    try {
        const { email, password, contact, fullname } = req.body;

        console.log("hello from register user controller");

        const existingUser = await User.findOne({
            $or: [
                {email},
                {contact}
            ]
        });

        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email or contact already exists."
            });
        }

        const newUser = await User.create({
            email,
            contact,
            password,
            fullname
        });

        await sendTokenResponse({user: newUser, res, message: "User registered"});
    } catch(err) {
        console.log("error:", err.message);

        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}