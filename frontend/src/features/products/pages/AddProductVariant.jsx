import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Navbar from "../../../shared/components/Navbar";
import { useProduct } from "../hooks/useProduct";
import { ToastContainer } from "react-toastify";
import AddVariantForm from "../components/AddVariantForm";

// Main Page
const AddProductVariant = () => {
    const [product, setProduct] = useState(null);
    const [activeImage, setActiveImage] = useState(null);
    const { handleGetProductDetails } = useProduct();
    const { productId } = useParams();

    useEffect(() => {
        const fetchProductDetails = async () => {
            const productDetails = await handleGetProductDetails(productId);
            setProduct(productDetails);

            if (productDetails?.images?.length > 0) {
                setActiveImage(productDetails.images[0].url);
            }
        }

        fetchProductDetails();
    }, [productId]);

    const images = product?.images ?? [];

    return (
        <main className="flex flex-col items-center min-h-screen w-screen bg-[#111111]/5">
            {/* Mock Header navbar space */}
            <Navbar pageName="Add Variant" backTo='/account' />

            <section className="flex flex-col w-full gap-15 p-6 items-center justify-center text-black">

                <section className="flex flex-col justify-center items-start lg:w-1/2">
                    <p className="text-[clamp(34px,4vw,22px)] text-[#4a270d]">Details</p>

                    <div className="flex lg:flex-row w-full flex-col shadow-sm items-center border border-black/10 rounded-sm">

                        {/* Image panel */}
                        <div className="flex-1 flex flex-col lg:gap-4 gap-1">
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

                            <p className="text-black mb-5 font-semibold">
                                {product?.price.currency} {product?.price.amount}
                            </p>

                            <p className="lg:text-sm text-xs text-stone-600 leading-relaxed max-w-sm mb-6">
                                {product?.description}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col lg:w-1/2 w-full">
                    {/* Header */}
                    <div className="flex flex-col justify-center items-start">
                        <h1 className="text-lg">Add a variant to this product</h1>

                        <p className="text-[clamp(34px,4vw,22px)] text-[#4a270d] font-semibold relative flex items-center lg:pl-6 lg:tracking-wide">
                            <span className="absolute left-0 w-3 h-3 rounded-full bg-[#6F4E37]" />
                            <span className="absolute left-0 w-3 h-3 rounded-full bg-[#6F4E37] animate-[ping_1s_linear_infinite]" />
                            Variant & Inventory
                        </p>
                    </div>

                    <AddVariantForm product={product} productId={productId} />
                </section>
            </section>

            <ToastContainer position='top-right' />
        </main>
    );
};

export default AddProductVariant;