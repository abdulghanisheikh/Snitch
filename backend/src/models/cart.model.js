import mongoose from "mongoose";
import { priceSchema } from "./price.schema";

const itemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    variant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: priceSchema,
        required: true
    }
});

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: [ itemSchema ]
});

const Cart = mongoose.model("cart", cartSchema);
export default Cart;