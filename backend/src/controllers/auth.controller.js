import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const registerUser = async(req, res) => {
    try {
        const { email, password, contact, fullname } = req.body;

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

        // create user
        const newUser = await User.create({
            email,
            contact,
            password,
            fullname
        });

        // create token
        

    } catch(err) {
        console.log("error:", err.message);

        return res.status(400).json({
            success: false,
            error: err.message
        });
    }
}