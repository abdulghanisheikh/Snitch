import Navbar from "../../../shared/components/Navbar";
import { useCart } from "../hooks/useCart";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import CartItem from "../components/CartItem";

const Cart = () => {
	const { handleUpdateCart } = useCart();
	const cartItems = useSelector(state => state.cart.cartItems);

	return <main className="min-h-screen w-screen flex flex-col bg-[#111111]/5">
		<Navbar pageName="Cart" backTo="/" />

		<div className="flex flex-col w-full px-10 gap-5">
			<h1 className="text-4xl self-center lg:mt-3">Your Cart</h1>

			<div className="w-full flex lg:flex-row flex-col items-start">
				<div className="min-h-full lg:w-[70%] lg:px-5 flex gap-3 lg:flex-row flex-col items-center flex-wrap">
					{
						cartItems.length === 0 ?
						<p className="text-center text-sm">Your cart is currently empty.</p> :
						cartItems.map((item, index) => {
							return <CartItem 
							key={index}
							cartItem={item}
							handleIncQty={async() => {
								await handleUpdateCart({
									productId: item.product._id,
									variantId: item.variant,
									action: "inc"
								});
							}}
							handleDecQty={async() => {
								await handleUpdateCart({
									productId: item.product._id,
									variantId: item.variant,
									action: "dec"
								});
							}}
							/>
						})
					}
				</div>

				<div
				className="lg:w-[30%] h-100 p-2 rounded-lg shadow-xs shadow-black/50 tracking-tight flex flex-col items-center relative bg-white">
					<p className="font-semibold text-xl">Order Summary</p>

					<div
					style={{
						scrollbarWidth: 'none'
					}} 
					className="flex flex-col w-full px-10 py-5 overflow-y-auto">
						{
							cartItems.map((item, index) => {
								return <div
								key={index}
								className="flex w-full justify-between items-center">
									<p>{item.product.title}</p>
									<p className="text-xs tracking-wide">{item.price.currency} <span className="text-lg">{item.price.amount}</span></p>
								</div>
							})
						}
					</div>

					<div className="w-full flex items-center gap-2 justify-center py-3 bg-amber-100 tracking-wide absolute bottom-0">
						<p>Total Bill:</p>
						<p>
							<span className="text-sm">INR </span>
							{cartItems.reduce((acc, item) => {
								const priceAmount = Number(item.price.amount);

								return acc + priceAmount;
							}, 0)}
						</p>
					</div>
				</div>
			</div>
		</div>
		<ToastContainer position="top-right" />
	</main>
}

export default Cart;