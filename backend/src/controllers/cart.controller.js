import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const addToCart = async(req, res) => {
    const { productId, variantId } = req.params;
    const { quantity = 1 } = req.body; 
    try {
        const product = await Product.findOne({
            $or: [
                { _id: productId },
                { "variants._id": variantId }
            ]
        });

        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product or Variant not available."
            });
        }

        const cart = (await Cart.findOne({ user: req.user.id })) || (await Cart.create({ user: req.user.id }));

        const isProductAlreadyInCart = cart.items.find(i => i.product.toString() === productId && i.variant?.toString() === variantId);
        
        const stock = variantId === undefined ? product?.stock : product.variants.find(v => v._id.toString() === variantId);

        // Updating the product's quantity in cart
        if(isProductAlreadyInCart) {
            const qtyInCart = isProductAlreadyInCart.quantity;

            if((qtyInCart + quantity) > stock) {
                return res.status(400).json({
                    success: false,
                    message: `Only ${stock} products left in stock. And you already have ${qtyInCart} products in cart.`
                });
            }

            await Cart.findOneAndUpdate({
                user: req.user.id,
                "items.product": productId,
                "items.variant": variantId
            }, {
                $inc: { "items.$.quantity": quantity }
            });

            return res.status(200).json({
                success: true,
                message: "Cart is updated."
            });
        }

        if(quantity > stock) {
            return res.status(400).json({
                success: false,
                message: `Only ${stock} product left in the stock.`
            });
        }

        // Adding new product to cart
        cart.items.push({
            product: productId,
            variant: variantId,
            quantity,
            price: variantId !== undefined ? product.variants.find(v => v._id === variantId).price : product.price 
        });

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product added to cart."
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

export const getCart = async(req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user.id
        }).populate("items.product");

        if(!cart) {
            cart = await Cart.create({ user: req.user.id });
        }

        res.status(200).json({
            success: true,
            message: "Cart products are fetched.",
            cart
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}