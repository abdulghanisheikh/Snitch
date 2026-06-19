import { Router } from "express";
import { validateLoginUser, validateRegisterUser } from "../validators/auth.validator.js";
import { registerUser, loginUser, googleCallback, getMe, logoutUser } from "../controllers/auth.controller.js";
import passport from "passport";
import {appConfig} from "../configs/app.config.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @route POST /api/auth/register
 * @description register the user
 * @access public
 */
router.post("/register", validateRegisterUser, registerUser);

/**
 * @route POST /api/auth/login
 * @description login the user
 * @access public
 */
router.post("/login", validateLoginUser, loginUser);

/**
 * @route GET /api/auth/google
 * @description just sends the user to google when client ask to login 
 * @access public
 */
router.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * @route GET /api/auth/google/callback
 * @description this route recieves user data from google's server in exchange of auth-code and sends token to the client
 * @access public
 */
router.get("/google/callback", 
    passport.authenticate('google', { session: false, failureRedirect: appConfig.NODE_ENV === "development" ? "http://localhost:5173/login" : "/login" }),
    googleCallback
);

/**
 * @route GET /api/auth/me
 * @description gets the user data
 * @access private
 */
router.get("/me", authenticateUser, getMe);

/**
 * @route POST /api/auth/logout
 * @description Logout user
 * @access private
 */
router.post("/logout", authenticateUser, logoutUser);

export default router;