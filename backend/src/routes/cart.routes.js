import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validateAddToCart, validateUpdateCart, validateDeleteItemFromCart } from "../validators/cart.validator.js";
import { addToCart, getCart, updateItemInCart, deleteItemFromCart, createOrderController } from "../controllers/cart.controller.js";

const router = Router();

/**
 * @route POST /api/cart/add/:productId/:variantId
 * @description Add product to cart
 * @access private
 */
router.post("/add/:productId/:variantId", authenticateUser, validateAddToCart, addToCart);

/**
 * @route PATCH /api/cart/update/:productId/:variantId
 * @description Update item quantity in cart
 * @access private
 */
router.patch("/update/:productId/:variantId", authenticateUser, validateUpdateCart, updateItemInCart);

/**
 * @route DELETE /api/cart/delete/:productId/:variantId
 * @description Delete item from cart
 * @access private
 */
router.delete("/delete/:productId/:variantId", authenticateUser, validateDeleteItemFromCart, deleteItemFromCart);

/**
 * @route GET /api/cart/
 * @description Get the user's cart
 * @access private
 */
router.get('/', authenticateUser, getCart);

/**
 * @route POST /api/cart/payment/createOrder
 * @description Create cart order
 * @access private
 */
router.post("/payment/createOrder", authenticateUser, createOrderController);

export default router;