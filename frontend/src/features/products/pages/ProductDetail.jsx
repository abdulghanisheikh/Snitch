import { useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link, useParams } from "react-router";
import { useProduct } from "../hooks/useProduct";

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [activeImage, setActiveImage] = useState(null);

    const { handleGetProductDetails } = useProduct();
    const { productId } = useParams();

    useEffect(() => {
        const fetchProductDetail = async () => {
            const detail = await handleGetProductDetails(productId);
            setProduct(detail);
            if (detail?.images?.length > 0) {
                setActiveImage(detail.images[0].url);
            }
        };

        fetchProductDetail();
    }, [productId]);

    const images = product?.images ?? [];

    return (
        <main className="min-h-screen w-screen flex flex-col lg:gap-20">

            <nav className="flex items-center w-full justify-between py-5 lg:px-10 px-5">

                <Link to='/' className="flex items-center justify-center lg:gap-3">
                    <MdArrowBackIos color="black" size={25} className="cursor-pointer active:scale-90 duration-300 ease-linear" />
                    <p className="text-black lg:text-lg text-sm tracking-wide">Product Details</p>
                </Link>
                <p className="lg:text-3xl text-xl font-bold text-[#6F4E37] tracking-wider">Snitch</p>

            </nav>

            <div className="flex lg:flex-row flex-col w-screen items-center justify-center px-5 lg:px-20">

                {/* Image panel */}
                <div className="flex-1 flex flex-col items-center w-full sm:w-full lg:gap-4 gap-1">
                    {/* Main image */}
                    <img
                        src={activeImage ?? ''}
                        alt="Product"
                        className="object-contain h-100 w-full transition-opacity duration-300"
                    />

                    {/* Thumbnail strip — only renders when there are multiple images */}
                    {images.length > 1 && (
                        <div className="flex items-center lg:gap-3 gap-2 flex-wrap justify-center">
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setActiveImage(img.url)}
                                    className={`
                                        lg:w-16 lg:h-16 w-12 h-12 rounded border-2 overflow-hidden shrink-0
                                        transition-all duration-200 ease-linear cursor-pointer
                                        ${activeImage === img.url
                                            ? 'border-stone-900 scale-105'
                                            : 'border-stone-300 hover:border-stone-500 opacity-70 hover:opacity-100'
                                        }
                                    `}
                                >
                                    <img
                                        src={img.url}
                                        alt={`Product view ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info panel */}
                <div className="lg:flex-1 flex flex-col justify-center lg:px-13 px-2 py-10 h-full w-full">
                    <h1 className="text-3xl text-stone-900 mb-2">
                        {product?.title}
                    </h1>

                    <div className="w-10 border-b-2 rounded-full border-stone-900 mb-4" />

                    <p className="text-[#9c6b4f] font-medium mb-5">
                        {product?.price.currency} {product?.price.amount}
                    </p>

                    <p className="lg:text-sm text-xs text-stone-600 leading-relaxed max-w-sm mb-6">
                        {product?.description}
                    </p>

                    <hr className="border-zinc-400 rounded-full mb-5 border" />

                    <div className="flex flex-col items-center gap-3 mt-5">
                        <button
                            type="button"
                            className="lg:w-2/3 w-full bg-stone-900 rounded-xs cursor-pointer text-white lg:text-sm text-xs tracking-widest uppercase lg:py-3 py-1.5 hover:bg-stone-800"
                        >
                            Add to Bag
                        </button>
                        <button
                            type="button"
                            className="lg:w-2/3 w-full rounded-xs border cursor-pointer border-stone-900 text-stone-900 lg:text-sm text-xs tracking-widest uppercase lg:py-3 py-1.5 flex items-center justify-center gap-2 hover:bg-stone-50"
                        >
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetail;