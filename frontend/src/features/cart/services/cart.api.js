import axios from "axios";

const cartApiInstance = axios.create({
    baseURL: '/api/cart',
    withCredentials: true
});

export const addToCart = async ({ productId, variantId }) => {
    const response = await cartApiInstance.post(`/add/${productId}/${variantId}`);
    return response;
}

export const updateCart = async({ productId, variantId, action }) => {
    const response = await cartApiInstance.patch(`/update/${productId}/${variantId}`, { action });
    return response;
}

export async function deleteItemFromCart({ productId, variantId }) {
    const response = await cartApiInstance.delete(`/delete/${productId}/${variantId}`);
    return response;
}

export async function getCart() {
    const response = await cartApiInstance.get('/');
    return response;
}

export async function createCartOrder() {
    const response = await cartApiInstance.post("/payment/order/create");
    return response;
}

export async function verifyOrderPayment({razorpay_order_id, razorpay_payment_id, razorpay_signature}) {
    const response = await cartApiInstance.post("/payment/verify/order", {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    });
    return response;
}