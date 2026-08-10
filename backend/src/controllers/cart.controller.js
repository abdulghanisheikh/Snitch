import { compareSync } from "bcryptjs";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const addToCart = async(req, res) => {
    const { productId, variantId } = req.params;
    console.log("variant ID:", variantId);
    
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
        
        const stock = variantId === undefined ? 
            product?.stock : 
            product.variants.find(v => v._id.toString() === variantId).stock;

        const productAlreadyInCart = cart.items.find(i => i.product.toString() === productId && i.variant?.toString() === variantId);

        if(productAlreadyInCart) {
            const qtyInCart = productAlreadyInCart.quantity;

            if((qtyInCart + 1) > stock) {
                return res.status(400).json({
                    success: false,
                    message: `Only ${stock} products left in stock. you have already ${qtyInCart} products in cart.`
                });
            }

            await Cart.findOneAndUpdate({
                user: req.user.id,
                "items.product": productId,
                "items.variant": variantId
            }, {
                $inc: { "items.$.quantity": 1 }
            });

            return res.status(200).json({
                success: true,
                message: "Cart updated"
            });
        }

        if(stock < 1) {
            return res.status(400).json({
                success: false,
                message: "Product is out of stock."
            });
        }

        // Adding new product to cart
        cart.items.push({
            product: productId,
            variant: variantId,
            quantity: 1,
            price: variantId !== undefined ? product.variants.find(v => v._id.toString() === variantId).price : product.price
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

export const updateItemInCart = async(req, res) => {
    const { productId, variantId } = req.params;
    const { action } = req.body;
    try {
        const product = await Product.findOne({
            $or: [
                { _id: productId },
                { "variants._id": variantId }
            ]
        });

        if(!product) {
            return res.status(400).json({
                success: false,
                message: "Product or variant not available."
            });
        }

        const cart = await Cart.findOne({ user: req.user.id });

        if(!cart) {
            return res.status(400).json({
                success: false,
                message: "Cart not found."
            });
        }

        const stock = variantId === undefined ? 
            product.stock : 
            product.variants.find(v => v._id.toString() === variantId).stock;

        const qtyInCart = cart.items.find(i => i.product.toString() === productId && i.variant?.toString() === variantId).quantity;

        if(action === "dec") {
            if(qtyInCart === 1) {
                await Cart.findOneAndUpdate({
                    user: req.user.id
                }, {
                    $pull: {
                        items: {
                            product: productId,
                            variant: variantId
                        }
                    }
                });

                return res.status(200).json({
                    success: true,
                    message: "Cart updated"
                });
            }

            await Cart.findOneAndUpdate({
                user: req.user.id,
                "items.product": productId,
                "items.variant": variantId
            }, {
                $inc: { "items.$.quantity": -1 }
            });

            return res.status(200).json({
                success: true,
                message: "Cart updated"
            });
        } else if(action === "inc") {
            if((qtyInCart + 1) > stock) {
                return res.status(400).json({
                    success: false,
                    message: `Only ${stock} products left in the stock. you already have ${qtyInCart} products in your cart.`
                });
            }
            
            await Cart.findOneAndUpdate({
                user: req.user.id,
                "items.product": productId,
                "items.variant": variantId
            }, {
                $inc: { "items.$.quantity": 1 }
            });

            res.status(200).json({
                success: true,
                message: "Cart updated"
            });
        }
    } catch(err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}