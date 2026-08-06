import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validateAddToCart, validateUpdateCart } from "../validators/cart.validator.js";
import { addToCart, getCart, updateItemInCart } from "../controllers/cart.controller.js";

const router = Router();

/**
 * @route POST /api/cart/add/:productId/:variantId
 * @description Add product to cart
 * @access private
 */
router.post('/add/:productId/:variantId', authenticateUser, validateAddToCart, addToCart);

/**
 * @route PATCH /api/cart/update/:productId/:variantId
 * @description Update quantity of product in cart
 * @access private
 */
router.patch('/update/:productId/:variantId', authenticateUser, validateUpdateCart, updateItemInCart);

/**
 * @route GET /api/cart/
 * @description Get the user's cart
 * @access private
 */
router.get('/', authenticateUser, getCart);

export default router;