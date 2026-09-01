import mongoose from "mongoose";
import { priceSchema } from "./price.schema.js";

const paymentSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ["pending", "failed", "paid"],
        default: "pending"
    },
    price: {
        type: priceSchema,
        required: true
    },
    razorpay: {
        orderId: String,
        paymentId: String,
        signature: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    orderItems: [
        {
            title: String,
            productId: mongoose.Schema.Types.ObjectId,
            variantId: mongoose.Schema.Types.ObjectId,
            images: [
                {
                    url: {
                        type: String,
                        required: true
                    }
                }
            ],
            price: {
                type: priceSchema,
                required: true
            },
            quantity: Number
        }
    ]
}, { timestamps: true });

const Payment = mongoose.model("payment", paymentSchema);
export default Payment;