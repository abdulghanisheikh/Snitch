import mongoose from "mongoose";

export const priceSchema = new mongoose.Schema({
    amount: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        enum: ['INR', 'USD', 'GBP', 'JPY', 'EUR'],
        default: 'INR'
    }
}, {
    _id: false,
    _v: false
});