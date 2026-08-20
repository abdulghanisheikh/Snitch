import { compareSync } from "bcryptjs";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const addToCart = async (req, res) => {
    const { productId, variantId } = req.params;
    try {
        const product = variantId
            ? await Product.findOne({ _id: productId, "variants._id": variantId })
            : await Product.findOne({ _id: productId });

        if (!product) {
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

        if (productAlreadyInCart) {
            const qtyInCart = productAlreadyInCart.quantity;

            if ((qtyInCart + 1) > stock) {
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

        if (stock < 1) {
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
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user.id)
                }
            },
            { $unwind: { path: '$items' } },
            {
                $lookup: {
                    from: 'products',
                    localField: 'items.product',
                    foreignField: '_id',
                    as: 'items.product'
                }
            },
            { $unwind: { path: '$items.product' } },
            {
                $unwind: { path: '$items.product.variants' }
            },
            {
                $match: {
                    $expr: {
                        $eq: [
                            '$items.variant',
                            '$items.product.variants._id'
                        ]
                    }
                }
            },
            {
                $addFields: {
                    itemPrice: {
                        price: {
                            $multiply: [
                                '$items.quantity',
                                {
                                    $toInt:
                                        '$items.product.variants.price.amount'
                                }
                            ]
                        },
                        currency:
                            '$items.product.variants.price.currency'
                    }
                }
            },
            {
                $group: {
                    _id: '$_id',
                    totalPrice: { $sum: '$itemPrice.price' },
                    currency: {
                        $first: '$itemPrice.currency'
                    },
                    items: { $push: '$items' }
                }
            }
        ]);

        if (!cart) {
            cart = await Cart.create({ user: req.user.id });
        }

        res.status(200).json({
            success: true,
            message: "Cart products are fetched.",
            cart
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

export const updateItemInCart = async (req, res) => {
    const { productId, variantId } = req.params;
    const { action } = req.body;
    try {
        const product = variantId
            ? await Product.findOne({ _id: productId, "variants._id": variantId })
            : await Product.findOne({ _id: productId });

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product or variant not available."
            });
        }

        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(400).json({
                success: false,
                message: "Cart not found."
            });
        }

        const stock = variantId === undefined ?
            product.stock :
            product.variants.find(v => v._id.toString() === variantId).stock;

        const qtyInCart = cart.items.find(i => i.product.toString() === productId && i.variant?.toString() === variantId).quantity;

        if (action === "dec") {
            if (qtyInCart === 1) {
                await Cart.findOneAndUpdate({
                    user: req.user.id
                }, {
                    $pull: {
                        items: variantId
                            ? { product: productId, variant: variantId }
                            : { product: productId, variant: null }
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
        } else if (action === "inc") {
            if ((qtyInCart + 1) > stock) {
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
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

export async function deleteItemFromCart(req, res) {
    const { productId, variantId } = req.params;
    try {
        const product = variantId
            ? await Product.findOne({ _id: productId, "variants._id": variantId })
            : await Product.findOne({ _id: productId });

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product or variant not available."
            });
        }

        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(400).json({
                success: false,
                message: "Cart not found."
            });
        }

        await Cart.findOneAndUpdate({
            user: req.user.id
        }, {
            $pull: {
                items: variantId
                    ? { product: productId, variant: variantId }
                    : { product: productId, variant: null }
            }
        });

        res.status(200).json({
            success: true,
            message: "Item removed from cart."
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}