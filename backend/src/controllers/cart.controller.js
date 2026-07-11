import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const addToCart = async(req, res) => {
    const productId = req.params.productId;
    const variantId = req.params.variantId;
    const quantity = req.body.quantity;
    
    try {
        const product = await Product.findById(productId);

        if(!product) {
            return res.status(401).json({
                success: false,
                message: "Product not available"
            });
        }

        const cart = await Cart.create({})
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
}