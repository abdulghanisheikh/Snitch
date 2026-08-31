import mongoose from "mongoose";
import { priceSchema } from "./price.schema.js";

const paymentSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ["pending", "failed", "paid"],
        default: "pending"
    },
    price: priceSchema,
    razorpay: {
        orderId: String,
        paymentId: String,
        signature: String
    },

}, {timestamps: true});

const Payment = mongoose.model("payments", paymentSchema);
export default Payment;