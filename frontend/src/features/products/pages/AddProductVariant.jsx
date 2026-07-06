import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Navbar from "../../../shared/components/Navbar";
import { useProduct } from "../hooks/useProduct";
import { ToastContainer } from "react-toastify";
import AddVariantForm from "../components/AddVariantForm";
import DetailsCard from "../components/DetailsCard";

// Main Page
const AddProductVariant = () => {
    const [product, setProduct] = useState(null);
    const [activeImage, setActiveImage] = useState(null);
    const { handleGetProductDetails } = useProduct();
    const { productId } = useParams();

    useEffect(() => {
        const fetchProductDetails = async() => {
            const productDetails = await handleGetProductDetails(productId);
            setProduct(productDetails);

            if(productDetails?.images?.length > 0) {
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

                
                <section className="lg:w-2/3 w-full">
                    <DetailsCard product={product} images={images} activeImage={activeImage} setActiveImage={setActiveImage} />
                </section>

                <section className="flex flex-col lg:w-1/2 w-full">
                    {/* Header */}
                    <div className="flex flex-col justify-center items-start">
                        <h1 className="text-lg">Add a variant to this product</h1>

                        <p className="text-[clamp(34px,4vw,22px)] text-[#4a270d] font-semibold relative flex items-center pl-6 tracking-wide">
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