import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
    images: [
        {
            url: {
                type: String,
                required: true
            }
        }
    ],
    stock: {
        type: Number,
        default: 0
    },
    attributes: {
        type: Map,
        of: String
    },
    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            enum: ['INR', 'USD', 'GBP', 'JPY', 'EUR'],
            default: 'INR'
        }
    }
});

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            enum: ["INR", "USD", "GBP", "JPY", "EUR"],
            default: "INR"
        }
    },
    images: [
        {
            url: {
                type: String,
                required: true
            }
        }
    ],
    variants: [ variantSchema ]
}, { timestamps: true });

const Product = new mongoose.model("product", productSchema);
export default Product;