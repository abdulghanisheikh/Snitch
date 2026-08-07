import { useSelector } from "react-redux";

const CartItem = ({ cartItem, handleIncQty, handleDecQty }) => {
	const { product, price, quantity } = cartItem;

    const loading = useSelector(state => state.cart.loading);

	return <main
    className="w-80 h-120 flex flex-col justify-between gap-3 rounded-xl overflow-hidden shadow-md bg-white border border-black/20">

        <div className="relative flex-1 w-full">
            <img
                src={product.images?.length === 0 ? '#' : product.images[0].url}
                alt="No Image"
                className="w-full h-72 object-cover"
            />
        </div>

        <div className="flex flex-col flex-1 w-full justify-evenly">
            <h1 className="text-xl font-light text-gray-900 tracking-tight px-5">
                {product.title}
            </h1>

            <p className="text-base text-gray-700 font-semibold px-5">{price.amount} {price.currency}</p>

            <hr className="w-full border-1/2 border-black/30"></hr>

			<div className="flex items-center self-center gap-5">
				<button
                disabled={loading === 'update cart'}
				onClick={handleIncQty}
				className="px-3 cursor-pointer rounded-full bg-orange-200 hover:bg-orange-300 duration-300 ease-in-out lg:text-lg active:scale-95">
                    +
                </button>

				<p>{quantity}</p>
				
                <button 
                disabled={loading === 'update cart'}
                onClick={handleDecQty}
                className="px-3 cursor-pointer rounded-full bg-orange-200 hover:bg-orange-300 duration-300 ease-in-out lg:text-lg active:scale-95">
                    -
                </button>
			</div>
        </div>
    </main>
}

export default CartItem;