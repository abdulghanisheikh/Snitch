import Razorpay from "razorpay";
import { appConfig } from "../configs/app.config.js";

const razorpay = new Razorpay({
    key_id: appConfig.RAZORPAY_KEY_ID,
    key_secret: appConfig.RAZORPAY_KEY_SECRET
});

export async function createOrder({amount, currency = "INR"}) {
    try {
        const options = {
            amount: amount * 100, // amount expected in smallest currency unit. for INR -> paise
            currency
        };

        const order = await razorpay.orders.create(options);
        return order;
    } catch(err) {
        return err;
    }
}