import Navbar from "../../../shared/components/Navbar";
import { useCart } from "../hooks/useCart";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import CartItem from "../components/CartItem";
import { Link } from "react-router";

const Cart = () => {
	const { handleUpdateCart, handleDeleteItemFromCart } = useCart();

	const loading = useSelector(state => state.cart.loading);
	const cartItems = useSelector(state => state.cart.cartItems);
	const totalBillAmount = useSelector(state => state.cart.totalCartPrice);
	const currency = useSelector(state => state.cart.currency);

	async function handleRemoveClick({productId, variantId}) {
		await handleDeleteItemFromCart({productId, variantId});
	}

	const totalNumberOfItems = cartItems?.length || 0;

	return <main className="min-h-screen w-screen flex flex-col bg-[#111111]/5">
		<Navbar pageName="Cart" backTo="/" />

		<div className="flex flex-col w-full px-10 gap-5">
			<h1 className="text-4xl self-center lg:mt-3">Your Cart</h1>

			<div className="w-full flex lg:flex-row flex-col lg:items-start items-center gap-5">
				<div className="min-h-full lg:w-[70%] lg:px-5 flex gap-3 lg:flex-row flex-col items-center flex-wrap">
					{
						cartItems.length === 0 && loading === "cart" ?
						<p className="text-center text-sm tracking-wide">
							Loading Cart...
						</p> :
						cartItems.length === 0 && loading !== "cart" ? 
						<p className="text-center text-sm opacity-70">
							Your cart is currently empty.
						</p> :
						
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
							handleRemoveClick={() => handleRemoveClick({
								productId: item.product._id,
								variantId: item.variant
							})}
							/>
						})
					}
				</div>

				{/* Order Summary of Cart */}
				<div
				className="lg:w-[30%] w-full h-100 px-5 py-3 gap-2.5 rounded-lg shadow-xs shadow-black/50 tracking-tight flex flex-col items-center relative bg-white">
					<p className="font-semibold lg:text-xl text-lg self-start">Order Summary</p>

					<hr className="border border-black/10 w-full rounded-full" />

					<div
					className="flex flex-col tracking-wide lg:text-sm text-xs w-full lg:px-7 lg:py-5 px-2 py-1 gap-1.5">
						{
							cartItems.length === 0 && loading === "cart" ? 
							<p className="text-xs w-full text-center tracking-wide">
								Loading order summary...
							</p> :
							cartItems.length === 0 && loading !== "cart" ?
							<p className="text-xs w-full text-center opacity-70">
								Add product to cart to generate the order summary.
							</p> :
							<>
								<div className="flex opacity-70 items-center justify-between">
									<p>Items</p>
									<p>{totalNumberOfItems}</p>
								</div>

								<div className="flex items-center justify-between">
									<p className="opacity-70">Subtotal</p>
									<p className="font-semibold"><span className="uppercase text-xs">{currency}</span> {totalBillAmount}</p>
								</div>

								<div className="flex opacity-70 items-center justify-between">
									<p>Shipping</p>
									<p className="font-semibold"><span className="font-normal uppercase text-xs">Inr</span> 0</p>
								</div>

								<div className="flex opacity-70 items-center justify-between">
									<p>Taxes</p>
									<p className="font-semibold"><span className="font-normal uppercase text-xs">Inr</span> 0</p>
								</div>
							</>
						}
					</div>

					<div className="w-full flex flex-col items-center gap-3 justify-between py-3 tracking-wide absolute bottom-0 px-5">
						<hr className="border border-black/10 w-full rounded-full mb-2" />
						
						<div className="flex w-full items-center justify-between">
							<p className="text-sm uppercase">Total</p>
							<p className="lg:text-lg text-sm font-semibold"><span className="uppercase lg:text-sm font-normal text-xs">{currency}</span> {totalBillAmount}</p>
						</div>

						{/* CTA Buttons */}
						<div className="flex justify-between items-center w-full">
							<Link to='/' className="rounded-sm text-white lg:text-sm text-xs py-0.5 px-2.5 hover:bg-stone-700 duration-300 ease-in-out active:scale-90 cursor-pointer bg-stone-900">
								Continue Shopping
							</Link>

							<button
							disabled={cartItems.length === 0}
							onClick={() => console.log("Checkout button clicked")}
							className={`rounded-sm text-white lg:text-sm text-xs py-0.5 px-2.5 ${cartItems.length > 0 ? 'hover:bg-stone-700 duration-300 ease-in-out active:scale-90 cursor-pointer bg-stone-900' : 'bg-stone-700'}`}>
								Proceed to Checkout
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<ToastContainer position="top-right" />
	</main>
}

export default Cart;