import Product from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export const createProduct = async(req, res) => {
    const {title, description, priceAmount, priceCurrency} = req.body;
    const seller = req.user;

    try {
        const images = await Promise.all(req.files.map(async (file) => {
            return await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname
            });
        }));

        // create product in db
        const product = await Product.create({
            title,
            description,
            price: {
                amount: priceAmount,
                currency: priceCurrency || "INR"
            },
            seller: seller.id,
            images
        });

        res.status(200).json({
            success: true,
            message: "Product created",
            product
        });
    } catch(err) {
        console.log("Create product error:", err);

        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

export const getSellerProducts = async(req, res) => {
    const seller = req.user;

    try {
        const products = await Product.find({ seller: seller.id });

        res.status(200).json({
            success: true,
            message: "Products fetched",
            products
        });
    } catch(err) {
        console.log("Get products error:", err.message);

        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

export const getAllProducts = async(req, res) => {
    try {
        const products = await Product.find();

        return res.status(200).json({
            success: true,
            message: "All products fetched",
            products
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

export const getProductDetails = async(req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);

        if(!product) {
            return res.status(400).json({
                success: false,
                message: "Product does not exist"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Product details fetched",
            productDetails: product
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

export const addProductVariant = async(req, res) => {
    const files = req.files;
    let images = [];
    const productId = req.params.productId;
    const { stock, priceAmount } = req.body;
    const attributes = JSON.parse(req.body.attributes);

    try {
        images = await Promise.all(files.map(async(file) => {
            return await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname
            });
        }));

        const product = await Product.findById(productId);

        product.variants.push({
            stock: Number(stock),
            attributes,
            images,
            price: { ...product.price, amount: Number(priceAmount) }
        });
        await product.save();

        res.status(200).json({
            success: true,
            message: "Product variant added"
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

export const deleteProduct = async(req, res) => {
    const productId = req.params.productId;

    try {
        const deletedProduct = await Product.findOneAndDelete({
            _id: productId,
            seller: req.user.id
        });

        if(!deleteProduct) {
            return res.status(400).json({
                success: false,
                message: "No product to delete"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted"
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

export const deleteProductVariant = async(req, res) => {
    const productId = req.params.productId;
    const index = Number(req.params.index);

    try {
        const product = await Product.findOne({ _id: productId, seller: req.user.id });

        if(!product) {
            return res.status(403).json({
                success: false,
                message: "Product not available"
            });
        }

        if(isNaN(index) || index < 0 || index >= product.variants.length) {
            return res.status(400).json({
                success: false,
                message: "Invalid variant index"
            });
        }

        product.variants.splice(index, 1);
        await product.save();

        res.status(200).json({
            success: true,
            message: "Variant deleted"
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}