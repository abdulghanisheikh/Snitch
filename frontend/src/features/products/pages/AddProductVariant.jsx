import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Navbar from "../../../shared/components/Navbar";
import { useProduct } from "../hooks/useProduct";
import { ToastContainer } from "react-toastify";
import AddVariantForm from "../components/AddVariantForm";
import VariantCard from "../components/VariantCard";

// Main Page
const AddProductVariant = () => {
    const [product, setProduct] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
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
    }, [productId, isOpen]);

    const images = product?.images ?? [];

    return (
        <main className="flex flex-col items-center min-h-screen w-screen bg-[#111111]/5">
            {/* Mock Header navbar space */}
            <Navbar pageName="Add Variant" backTo='/account' />

            <section className="flex flex-col w-full gap-15 p-6 items-center justify-center text-black">

                <section className="flex flex-col justify-center items-start lg:w-1/2">
                    <p className="text-[clamp(34px,4vw,22px)] text-[#4a270d]">Details</p>

                    <div className="flex lg:flex-row w-full flex-col shadow-sm items-start border border-black/10 rounded-sm">

                        {/* Image panel */}
                        <div className="flex-1 flex flex-col lg:gap-4 gap-1">
                            {/* Main image */}
                            <img
                                src={activeImage !== '' ? activeImage : ''}
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
                            <h1 className="text-3xl text-stone-900 mb-1">
                                {product?.title}
                            </h1>

                            <p className="lg:text-sm text-xs text-stone-600 leading-relaxed max-w-sm mb-4">
                                {product?.description}
                            </p>

                            <p className="text-black mb-5 font-semibold">
                                {product?.price.currency} {product?.price.amount}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col lg:w-1/2 w-full gap-3">
                    {/* Header */}
                    <div className="flex items-center justify-between w-full">
                        <p className="lg:text-4xl text-lg text-[#4a270d] font-semibold relative flex items-center lg:pl-6">
                            <span className="absolute left-0 lg:w-3 lg:h-3 w-1.5 h-1.5 rounded-full bg-[#6F4E37]" />
                            <span className="absolute left-0 lg:w-3 lg:h-3 w-1.5 h-1.5 rounded-full bg-[#6F4E37] animate-[ping_1s_linear_infinite]" />
                            Variants & Inventory
                        </p>

                        <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="rounded-xs bg-black text-white lg:px-3 px-2 lg:py-1 cursor-pointer active:scale-90 duration-300 ease-in-out lg:text-sm text-xs">
                            {
                                isOpen ? "Cancel" : "Add New Variant"
                            }
                        </button>
                    </div>

                    {
                        isOpen && <AddVariantForm product={product} productId={productId} />
                    }

                    <div className="flex flex-col items-center justify-center gap-2 mt-3">
                        {
                            product?.variants.length > 0 ? (
                                product.variants.map((variant, index) => {
                                    return <VariantCard
                                    key={index}
                                    image={variant.images[0].url} 
                                    attributes={variant.attributes}
                                    price={variant.price.amount}
                                    currency={variant.price.currency}
                                    stock={variant.stock}
                                    />
                                })
                            ) : (
                                <p className="text-sm self-start mt-5">No Variants Added</p>
                            )
                        }
                    </div>
                </section>
            </section>

            <ToastContainer position='top-right' />
        </main>
    );
};

export default AddProductVariant;