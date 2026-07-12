import Product from "../models/product.model.js";

export const stockOfVariant = ({ product, variantId}) => {
    const { stock } = product.variants.find(variant => variant._id.toString() === variantId);
    return stock;
}