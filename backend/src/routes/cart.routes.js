import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validateCart } from "../validators/cart.validator.js";

const router = Router();

/**
 * @route POST /api/cart/add/:productId/:variantId
 * @description Add product to cart
 * @access private
 */
router.post('/add/:productId/:variantId', authenticateUser, validateCart, addToCart);

export default router;