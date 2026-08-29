import { compareSync } from "bcryptjs";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

export async function addToCart(req, res) {
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
            price: variantId !== undefined ?
                product.variants.find(v => v._id.toString() === variantId).price :
                product.price
        });

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product added to cart.",
            cart
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

export async function getCart(req, res) {
    const userId = req.user?.id;
    try {
        let cart = await Cart.aggregate([
            // 1. Get this user's cart document
            {
                '$match': {
                    'user': new mongoose.Types.ObjectId(userId)
                }
            },

            // 2. Break the items array into one document per cart item
            {
                '$unwind': '$items'
            },

            // 3. Fetch the live product for this item
            {
                '$lookup': {
                    'from': 'products',
                    'localField': 'items.product',
                    'foreignField': '_id',
                    'as': 'productData'
                }
            },

            // 4. Drop items whose product no longer exists (e.g. deleted by seller)
            {
                '$match': {
                    'productData.0': { '$exists': true }
                }
            },

            // 5. Unwind productData -> a single product object per item
            {
                '$unwind': '$productData'
            },

            // 6. Find the matching variant (if any) directly, without fanning out
            {
                '$addFields': {
                    'matchedVariant': {
                        '$first': {
                            '$filter': {
                                'input': '$productData.variants',
                                'as': 'v',
                                'cond': { '$eq': ['$$v._id', '$items.variant'] }
                            }
                        }
                    }
                }
            },

            // 7. If a variant WAS selected on the cart item, it must still exist on the product.
            //    If no variant was selected, always pass.
            {
                '$match': {
                    '$expr': {
                        '$or': [
                            { '$eq': [{ '$ifNull': ['$items.variant', null] }, null] },
                            { '$ne': ['$matchedVariant', null] }
                        ]
                    }
                }
            },

            // 8. Compute this item's live price = quantity * (variant price, or base product price)
            {
                '$addFields': {
                    'itemPrice': {
                        'amount': {
                            '$multiply': [
                                '$items.quantity',
                                {
                                    '$toDouble': {
                                        '$ifNull': [
                                            '$matchedVariant.price.amount',
                                            '$productData.price.amount'
                                        ]
                                    }
                                }
                            ]
                        },
                        'currency': {
                            '$ifNull': [
                                '$matchedVariant.price.currency',
                                '$productData.price.currency'
                            ]
                        }
                    }
                }
            },

            // 9. Shape the final item object for the frontend:
            //    live product info, resolved variant (or null), quantity, live unit price
            {
                '$addFields': {
                    'items.product': '$productData',
                    'items.variant': '$matchedVariant',
                    'items.price': {
                        'amount': {
                            '$ifNull': ['$matchedVariant.price.amount', '$productData.price.amount']
                        },
                        'currency': {
                            '$ifNull': ['$matchedVariant.price.currency', '$productData.price.currency']
                        }
                    }
                }
            },

            // 10. Drop temp working fields
            {
                '$project': {
                    'productData': 0,
                    'matchedVariant': 0
                }
            },

            // 11. Recombine into one cart document: sum total, keep currency, collect items
            {
                '$group': {
                    '_id': '$_id',
                    'totalCartPrice': { '$sum': '$itemPrice.amount' },
                    'currency': { '$first': '$itemPrice.currency' },
                    'items': { '$push': '$items' }
                }
            }
        ]);

        if (!cart) {
            await Cart.create({ user: userId });
        }

        if (cart?.length === 0) {
            cart = [
                {
                    items: [],
                    totalCartPrice: 0,
                    currency: "INR"
                }
            ];
        }

        return res.status(200).json({
            success: true,
            message: "Cart details fetched.",
            cart: cart[0]
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

export async function updateItemInCart(req, res) {
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

        let cart = await Cart.findOne({ user: req.user.id });

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
                cart = await Cart.findOneAndUpdate({
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
                    message: "Cart updated",
                    cart
                });
            }

            cart = await Cart.findOneAndUpdate({
                user: req.user.id,
                "items.product": productId,
                "items.variant": variantId
            }, {
                $inc: { "items.$.quantity": -1 }
            });

            return res.status(200).json({
                success: true,
                message: "Cart updated",
                cart
            });
        } else if (action === "inc") {
            if ((qtyInCart + 1) > stock) {
                return res.status(400).json({
                    success: false,
                    message: `Only ${stock} products left in the stock. you already have ${qtyInCart} products in your cart.`
                });
            }

            cart = await Cart.findOneAndUpdate({
                user: req.user.id,
                "items.product": productId,
                "items.variant": variantId
            }, {
                $inc: { "items.$.quantity": 1 }
            });

            res.status(200).json({
                success: true,
                message: "Cart updated",
                cart
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