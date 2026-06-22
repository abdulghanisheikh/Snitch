import { useEffect } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { useProduct } from "../hooks/useProduct";

const ProductDetails = () => {
    const productDetails = useSelector(state => state.product.productDetails);
    const { handleGetProductDetails } = useProduct();

    const getPrice = () => {
		const { currency, amount } = productDetails.price;

		if (currency === 'INR') return '₹ ' + amount;
		if (currency === 'USD') return '$ ' + amount;
		if (currency === 'GBP') return '£ ' + amount;
		if (currency === 'JPY') return '¥ ' + amount;
		if (currency === 'ERU') return '€ ' + amount;
	}

    useEffect(() => {
        handleGetProductDetails(productDetails?._id);
    });

    return <main className="min-h-screen w-screen flex flex-col">

        <nav className="flex items-center w-full justify-between py-5 lg:px-10 px-5">
            <div className="flex items-center justify-center gap-3">

                <Link to='/'>
                    <MdArrowBackIos color="black" size={25} className="cursor-pointer active:scale-90 duration-300 ease-linear" />
                </Link>

                <p className="text-black text-lg tracking-wide">Product Details</p>
            </div>

            <p className="text-3xl font-bold text-[#6F4E37] tracking-wider">Snitch</p>
        </nav>

        <div className="flex lg:flex-row items-center justify-center">
            {/* Image panel */}
            <img
                src={`${productDetails?.images?.length === 0 ? '' : productDetails?.images[0].url}`}
                alt="No Image"
                className="object-contain flex-1 h-100"
            />

            <div className="flex-1 flex flex-col justify-center px-13 py-10 h-full">
                <h1 className="text-3xl text-stone-900 mb-2">
                    {productDetails?.title}
                </h1>

                <div className="w-10 border-b-2 rounded-full border-stone-900 mb-4" />

                <p className="text-[#9c6b4f] font-medium mb-5">{getPrice}</p>

                <p className="text-sm text-stone-600 leading-relaxed max-w-sm mb-6">
                    {productDetails?.description}
                </p>

                <hr className="border-zinc-400 rounded-full mb-5 border" />

                <div className="flex flex-col items-center gap-3 mt-5">
                    <button
                        type="button"
                        className="w-2/3 bg-stone-900 rounded-xs cursor-pointer text-white text-sm tracking-widest uppercase py-3 hover:bg-stone-800"
                    >
                        Add to Bag
                    </button>
                    <button
                        type="button"
                        className="w-2/3 rounded-xs border cursor-pointer border-stone-900 text-stone-900 text-sm tracking-widest uppercase py-3 flex items-center justify-center gap-2 hover:bg-stone-50"
                    >
                        Add to Wishlist
                    </button>
                </div>
            </div>
        </div>
    </main>
}

export default ProductDetails;