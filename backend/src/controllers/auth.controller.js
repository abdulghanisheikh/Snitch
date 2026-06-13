import { appConfig } from "../configs/app.config.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const sendTokenResponse = async ({ user, res, message }) => {
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

export const registerUser = async (req, res) => {
    const { email, password, contact, fullname, isSeller } = req.body;

    try {
        const existingUser = await User.findOne({
            $or: [
                { email },
                { contact }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email or contact already exists."
            });
        }

        const newUser = await User.create({
            email,
            contact,
            password,
            fullname,
            role: isSeller ? "seller" : "buyer"
        });

        await sendTokenResponse({ user: newUser, res, message: "User registered" });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isPasswordMatch = await user.comparePasswords(password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        await sendTokenResponse({ user, res, message: "User logged-In" });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

export const googleCallback = async (req, res) => {
    const { id, displayName, emails, photos } = req.user; // from google server

    try {
        const email = emails[0].value;
        const profilePic = photos[0].value;

        let user = await User.findOne({email});

        if(!user) {
            user = await User.create({
                email,
                googleId: id,
                fullname: displayName
            });
        }

        const token = jwt.sign(
            {id: user._id},
            appConfig.JWT_SECRET, 
            {expiresIn: "7d"}
        );

        res.cookie("token", token);
        res.status(200).redirect("http://localhost:5173/");
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

export const getMe = async(req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);

        res.status(200).json({
            success: true,
            message: "User fetched",
            user
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
} 