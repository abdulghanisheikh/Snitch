import { useSelector } from "react-redux";
import { useCart } from "../hooks/useCart";
import { useEffect } from "react";

const CartItem = ({ cartItem, handleIncQty, handleDecQty, handleRemoveClick }) => {
    const { product, quantity, price } = cartItem;

    const variant = cartItem.variant
    ? product.variants?.find(v => v._id.toString() === cartItem.variant)
    : null;

    let selectedItem = {
        title: product.title,
        quantity,
        price
    };

    if(variant) {
        selectedItem = {
            ...selectedItem,
            images: variant.images
        }
    } else {
        selectedItem = {
            ...selectedItem,
            images: product.images
        }
    }

    const loading = useSelector(state => state.cart.loading);

    const { handleGetCart } = useCart();
    async function getCart() {
        await handleGetCart();
    }

    useEffect(() => {
        if(selectedItem.quantity === 0) {
            getCart();
        }
    }, [selectedItem]);

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
            <div className="flex flex-col tracking-wide px-8 py-3 gap-2">
                <h1 className="lg:text-xl text-gray-900 tracking-tight">
                    {selectedItem.title}
                </h1>

                <p className="lg:text-sm text-xs text-gray-700 font-semibold">{selectedItem.price.currency} <span className="text-base">{selectedItem.price.amount}</span></p>

                <p className="opacity-50 text-xs">{selectedItem.quantity} in Stock</p>
            </div>

			<div className="flex items-center justify-between px-8">
                <div className="flex items-center text-white justify-center bg-stone-900 rounded-sm w-fit self-center gap-2">
                    <button
                    disabled={loading === 'update cart'}
                    onClick={handleIncQty}
                    className="px-3 cursor-pointer hover:bg-stone-800 duration-300 ease-in-out lg:text-lg active:scale-95">
                        +
                    </button>

                    <p>{selectedItem.quantity}</p>
                    
                    <button 
                    disabled={loading === 'update cart'}
                    onClick={handleDecQty}
                    className="px-3 cursor-pointer hover:bg-stone-800 duration-300 ease-in-out lg:text-lg active:scale-95">
                        -
                    </button>
                </div>

                <button 
                onClick={handleRemoveClick}
                disabled={loading === "delete cart"}
                className="opacity-80 hover:opacity-100 duration-300 ease-in-out cursor-pointer uppercase tracking-wide text-red-500 text-xs">
                    Remove
                </button>
            </div>
        </div>
    </main>
}

export default CartItem;