import { Router } from "express";
import { validateLoginUser, validateRegisterUser } from "../validators/auth.validator.js";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

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

export default router;