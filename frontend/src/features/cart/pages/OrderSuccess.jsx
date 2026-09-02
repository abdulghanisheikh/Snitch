import { useSearchParams } from "react-router";

const OrderSuccess = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("order_id");

    return <main className="h-screen w-screen flex items-center justify-center">
        <h1 className="text-5xl font-semibold">Order Successfull!</h1>
        <p className="text-xl">Order ID: {orderId}</p>
    </main>
}

export default OrderSuccess;