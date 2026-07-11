import mongoose from "mongoose";
import { priceSchema } from "./price.schema";

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
        type: priceSchema,
        required: true
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
        type: priceSchema,
        required: true
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

const Product = mongoose.model("product", productSchema);
export default Product;