import { Router } from "express";
import { validateLoginUser, validateRegisterUser } from "../validators/auth.validator.js";
import { registerUser, loginUser, googleCallback } from "../controllers/auth.controller.js";
import passport from "passport";

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
    passport.authenticate('google', { session: false }),
    googleCallback
);

export default router;