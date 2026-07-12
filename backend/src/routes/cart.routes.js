import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validateCart } from "../validators/cart.validator.js";
import { addToCart, getCart } from "../controllers/cart.controller.js";

const router = Router();

/**
 * @route POST /api/cart/add/:productId/:variantId
 * @description Add product to cart
 * @access private
 */
router.post('/add/:productId/:variantId', authenticateUser, validateCart, addToCart);

/**
 * @route GET /api/cart/
 * @description Get the user's cart
 * @access private
 */
router.get('/', authenticateUser, getCart);

export default router;