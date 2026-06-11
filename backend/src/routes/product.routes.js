import express from "express";
import { createProduct, getSellerProducts } from "../controllers/product.controller.js";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import upload from "../configs/upload.config.js";
import { createProductValidator } from "../validators/product.validator.js";

const router = express.Router();

/**
 * @route POST /api/product/
 * @description create a new product
 * @access private (seller only)
 */
router.post("/", authenticateSeller, createProductValidator, upload.array("photo", 7), createProduct);

/**
 * @route GET /api/product/seller
 * @description see all products of the authenticated seller
 * @access private (seller only)
 */
router.get("/seller", authenticateSeller, getSellerProducts);

export default router;