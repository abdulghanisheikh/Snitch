import { useSelector } from "react-redux";

const CartItem = ({ cartItem, handleIncQty, handleDecQty }) => {
    const {product, quantity} = cartItem;
    const variant = product.variants.find(v => v._id === cartItem.variant);

    let selectedItem = {
        title: product.title,
        quantity
    };

    if(variant) {
        selectedItem = {
            ...selectedItem,
            images: variant.images,
            price: variant.price,
        }
    } else {
        selectedItem = {
            ...selectedItem,
            images: product.images,
            price: product.price
        }
    }

    const loading = useSelector(state => state.cart.loading);

	return <main
    className="w-full flex h-40 relative items-start rounded-xl overflow-hidden shadow-md bg-white border border-black/20">

        <div className="relative w-[30%] h-full">
            <img
                src={selectedItem.images?.length === 0 ? '#' : selectedItem.images[0].url}
                alt="No Image"
                className="w-full h-full object-contain"
            />
        </div>

        <div className="flex flex-col justify-between pb-3 w-[70%] h-full">
            <div className="flex flex-col px-8 py-3 gap-2">
                <h1 className="lg:text-xl text-gray-900 tracking-tight">
                    {selectedItem.title}
                </h1>

                <p className="text-sm text-gray-700 font-semibold">{selectedItem.price.amount} {selectedItem.price.currency}</p>
            </div>

			<div className="flex items-center justify-center gap-3">
				<button
                disabled={loading === 'update cart'}
				onClick={handleIncQty}
				className="px-3 cursor-pointer rounded-full bg-orange-200 hover:bg-orange-300 duration-300 ease-in-out lg:text-lg active:scale-95">
                    +
                </button>

				<p>{selectedItem.quantity}</p>
				
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