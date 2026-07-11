import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @route POST /api/cart/:productId/add
 * @description Add product to cart
 * @access private
 */
router.post('/:productId/add', authenticateUser, addToCart);

export default router;