import Navbar from "../../../shared/components/Navbar";
import { useCart } from "../hooks/useCart";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import CartItem from "../components/CartItem";

const Cart = () => {
	const { handleGetCart, handleUpdateCart } = useCart();
	const cartItems = useSelector(state => state.cart.cartItems);

	const initCart = async() => await handleGetCart();

	useEffect(() => {
		initCart();
	}, []);

	return <main className="min-h-screen w-screen flex flex-col bg-[#111111]/5">
		<Navbar pageName="Cart" backTo="/" />

		<div className="flex flex-col w-full lg:gap-5 px-10">
			<h1 className="text-4xl self-center lg:mt-3">Your Cart</h1>

			<div className="w-full flex flex-col lg:flex-row flex-wrap items-center gap-5">
				{
					cartItems?.length === 0 ? 
					<p className="text-sm text-center w-full opacity-60">Cart is empty.</p> : 
					<div className="flex items-center gap-3">
						{
							cartItems.map((item, index) => {
								return <CartItem
								handleDecQty={async() => {
									await handleUpdateCart({
										productId: item.product._id,
										variantId: item.variant,
										action: "dec"
									});
								}}
								handleIncQty={async() => {
									await handleUpdateCart({
										productId: item.product._id,
										variantId: item.variant,
										action: "inc"
									});
								}}
								cartItem={item} 
								key={index} 
								/>
							})
						}
					</div>
				}
			</div>
		</div>
		<ToastContainer position="top-right" />
	</main>
}

export default Cart;