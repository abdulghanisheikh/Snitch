import express from "express";
import { createProduct, getSellerProducts, getAllProducts } from "../controllers/product.controller.js";
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
 * @access private
 */
router.get("/", authenticateUser, getAllProducts);

export default router;