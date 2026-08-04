import mongoose from "mongoose";
import { priceSchema } from "./price.schema.js";

const itemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    variant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product.variants'
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: priceSchema,
        required: true
    }
}, { _id: false, _v: false });

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    items: [ itemSchema ]
});

const Cart = mongoose.model("cart", cartSchema);
export default Cart;