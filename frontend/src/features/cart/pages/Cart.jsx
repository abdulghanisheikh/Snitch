import Navbar from "../../../shared/components/Navbar";
import { useCart } from "../hooks/useCart";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import CartItem from "../components/CartItem";

const Cart = () => {
	const { handleUpdateCart } = useCart();
	const cartItems = useSelector(state => state.cart.cartItems);

	const totalBillAmount = cartItems.reduce((acc, item) => {
		const amount = item.price.amount;
		const quantity = item.quantity;

		return (amount * quantity) + acc;
	}, 0);

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
							cartItems.length === 0 ? 
							<p className="text-xs w-full text-center opacity-70">Add product to cart to generate the order summary.</p> :
							cartItems.map((item, index) => {
								return <div
								key={index}
								className="flex w-full bg-zinc-100 px-2 rounded-md justify-between items-center">
									<p>{item.product.title}</p>
									<p className="text-xs tracking-wide">{item.price.currency} <span className="text-lg">{item.price.amount}</span> x <span className="text-lg">{item.quantity}</span></p>
								</div>
							})
						}
					</div>

					<div className="w-full flex flex-col items-center gap-3 justify-between py-3 tracking-wide absolute bottom-0 px-5">
						<div className="flex w-full items-center justify-between">
							<p className="text-sm uppercase">Total</p>
							<p className="text-lg font-semibold"><span className="uppercase text-xs font-normal">Inr</span> {totalBillAmount}</p>
						</div>

						<button
						disabled={cartItems.length === 0}
						className="bg-stone-900 self-end rounded-sm cursor-pointer text-white lg:text-sm text-xs py-0.5 px-2.5 hover:bg-stone-700 duration-300 ease-in-out active:scale-90">Checkout</button>
					</div>
				</div>
			</div>
		</div>
		<ToastContainer position="top-right" />
	</main>
}

export default Cart;