import express from "express";
import { createProduct, getSellerProducts, getAllProducts, getProductDetails } from "../controllers/product.controller.js";
import { authenticateSeller, authenticateUser } from "../middlewares/auth.middleware.js";
import upload from "../configs/upload.config.js";
import { createProductValidator } from "../validators/product.validator.js";

const router = express.Router();

/**
 * @route POST /api/product/
 * @description create a new product
 * @access private (seller only)
 */
router.post("/", authenticateSeller, upload.array("photo", 7), createProductValidator, createProduct);

/**
 * @route GET /api/product/seller
 * @description see all products of the authenticated seller
 * @access private (seller only)
 */
router.get("/seller", authenticateSeller, getSellerProducts);

/**
 * @route GET /api/product/
 * @description get all products for the user
 * @access public
 */
router.get("/", getAllProducts);

/**
 * @route GET /api/product/:productId
 * @description gives the product details
 * @access public
 */
router.get('/:productId', authenticateSeller, getProductDetails);

export default router;