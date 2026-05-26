import { Router } from "express";
import { validateRegisterUser } from "../validators/auth.validator.js";
import { registerUser } from "../controllers/auth.controller.js";

const router = Router();

/**
 * @route POST /api/auth/register
 * @description register the user
 * @access public
 */
router.post("/register", validateRegisterUser, registerUser);

export default router;