import express from "express";
import { createProduct, getSellerProducts, getAllProducts, getProductDetails, addProductVariant, deleteProduct, deleteProductVariant } from "../controllers/product.controller.js";
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
router.get('/:productId', getProductDetails);

/**
 * @route POST /api/product/:productId/variants
 * @description Add the variant of the product
 * @access private
 */
router.post('/:productId/variants', upload.array('photos'), authenticateSeller, addProductVariant);

/**
 * @route DELETE /api/product/:productId
 * @description Delete the product
 * @access private
 */
router.delete('/:productId', authenticateSeller, deleteProduct);

/**
 * @route DELETE /api/product/:productId/variants/:index
 * @description Deletes the variant of a product
 * @access private
 */
router.delete('/:productId/variants/:index', authenticateSeller, deleteProductVariant);

export default router;