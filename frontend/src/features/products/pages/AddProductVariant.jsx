import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Navbar from "../../../shared/components/Navbar";
import { useProduct } from "../hooks/useProduct";
import { ToastContainer } from "react-toastify";
import AddVariantForm from "../components/AddVariantForm";

// Main Page
const AddProductVariant = () => {
    const [ product, setProduct ] = useState(null);
    const { handleGetProductDetails } = useProduct();
    const { productId } = useParams();

    const handleOnSubmit = async() => {
        console.log("form submitted");
    }

    useEffect(() => {
        const fetchProductDetails = async() => {
            const productDetails = await handleGetProductDetails(productId);
            setProduct(productDetails);
        }

        fetchProductDetails();
    }, [productId]);

    return (
        <main className="flex flex-col items-center min-h-screen w-screen bg-[#111111]/5">
            {/* Mock Header navbar space */}
            <Navbar pageName="Add Variant" backTo='/account' />

            <form onSubmit={handleOnSubmit} className="flex flex-col gap-2 px-6 py-2.5 mx-auto justify-center items-start text-black">

                {/* Header */}
                <div className="flex flex-col justify-center items-start">
                    <h1 className="text-lg">Add a variant to this product</h1>

                    <p className="text-[clamp(34px,4vw,22px)] text-[#4a270d] font-semibold relative flex items-center pl-6 tracking-wide">
                        <span className="absolute left-0 w-3 h-3 rounded-full bg-[#6F4E37]" />
                        <span className="absolute left-0 w-3 h-3 rounded-full bg-[#6F4E37] animate-[ping_1s_linear_infinite]" />
                        Variant & Inventory
                    </p>
                </div>

                <AddVariantForm product={product} key={product?.title} />
            </form>

            <ToastContainer position='top-right' />
        </main>
    );
};

export default AddProductVariant;