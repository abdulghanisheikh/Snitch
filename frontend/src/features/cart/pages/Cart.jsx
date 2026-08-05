import Navbar from "../../../shared/components/Navbar";
import { useCart } from "../hooks/useCart";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import ProductCard from "../components/ProductCard";

const Cart = () => {
	const { handleGetCart } = useCart();
	const cartItems = useSelector(state => state.cart.cartItems);

	const initCart = async() => await handleGetCart();

	useEffect(() => {
		initCart();
	}, []);

	return <main className="min-h-screen w-screen flex flex-col bg-[#111111]/5">
		<Navbar pageName="Cart" backTo="/" />

		<div className="flex flex-col w-full lg:gap-5 px-10">
			<h1 className="text-4xl self-center lg:mt-3">Cart Items</h1>

			<div className="w-full flex flex-col lg:flex-row flex-wrap items-center gap-5">
				{
					cartItems?.length === 0 ? 
					<p className="lg:text-sm text-xs px-10">Cart is empty.</p> : 
					<div className="flex items-center gap-3">
						{
							cartItems.map((item, index) => {
								return <ProductCard cartItem={item} key={index} />
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