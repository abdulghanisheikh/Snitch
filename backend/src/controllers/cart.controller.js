import Cart from "../models/cart.model.js";

export const addToCart = (req, res) => {
    const productId = req.params.productId;
    try {

    } catch(err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
}