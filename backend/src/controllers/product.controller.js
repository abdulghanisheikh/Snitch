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

export const getSellerProducts = async (req, res) => {
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