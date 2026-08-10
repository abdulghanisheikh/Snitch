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

			<div className="w-full flex lg:flex-row flex-col lg:items-start items-center gap-5">
				<div className="min-h-full lg:w-[70%] lg:px-5 flex gap-3 lg:flex-row flex-col items-center flex-wrap">
					{
						cartItems.length === 0 ?
						<p className="text-center text-sm">Your cart is currently empty.</p> :
						cartItems.map((item) => {
							return <CartItem 
							key={item.product._id}
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
				className="lg:w-[30%] w-full h-100 p-2 gap-2.5 lg:gap-0 rounded-lg shadow-xs shadow-black/50 tracking-tight flex flex-col items-center relative bg-white">
					<p className="font-semibold text-xl">Order Summary</p>

					<div
					style={{
						scrollbarWidth: 'none'
					}}
					className="flex flex-col w-full lg:px-10 lg:py-5 px-2 py-1 overflow-y-auto">
						{
							cartItems.length === 0 ? 
							<p className="text-xs w-full text-center opacity-70">Add product to cart to generate the order summary.</p> :
							cartItems.map((item) => {
								return <div
								key={item.product._id}
								className="flex w-full lg:tracking-wide bg-zinc-100 lg:px-2 rounded-md justify-between items-center">
									<p className="text-sm lg:text-md">{item.product.title}</p>
									<p className="text-xs lg:tracking-wide tracking-tighter">{item.price.currency} <span className="lg:text-md text-xs">{item.price.amount}</span> x <span className="lg:text-md">{item.quantity}</span></p>
								</div>
							})
						}
					</div>

					<div className="w-full flex flex-col items-center gap-3 justify-between py-3 tracking-wide absolute bottom-0 px-5">
						<div className="flex w-full items-center justify-between">
							<p className="text-sm uppercase">Total</p>
							<p className="lg:text-lg text-sm font-semibold"><span className="uppercase text-sm font-normal">Inr</span> {totalBillAmount}</p>
						</div>

						<button
						disabled={cartItems.length === 0}
						className={`self-end rounded-sm text-white lg:text-sm text-xs py-0.5 px-2.5 ${cartItems.length > 0 ? 'hover:bg-stone-700 duration-300 ease-in-out active:scale-90 cursor-pointer bg-stone-900' : 'bg-stone-700'}`}>
							Checkout
						</button>
					</div>
				</div>
			</div>
		</div>
		<ToastContainer position="top-right" />
	</main>
}

export default Cart;