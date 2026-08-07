import { useEffect, useRef, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link, useParams } from "react-router";
import { useProduct } from "../hooks/useProduct";
import { useSelector } from "react-redux";
import DetailsCard from "../components/DetailsCard";
import { useCart } from "../../cart/hooks/useCart";
import { ToastContainer } from "react-toastify";

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [activeImage, setActiveImage] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [hide, setHide] = useState(true);

    const loginBoxRef = useRef(null);

    const loading = useSelector(state => state.product.loading);
    const user = useSelector(state => state.auth.user);

    const { handleGetProductDetails } = useProduct();
    const { handleAddToCart } = useCart();
    const { productId } = useParams();

    useEffect(() => {
        async function fetchProductDetail() {
            const detail = await handleGetProductDetails(productId);
            setProduct(detail);
            setSelectedVariant(null);

            if (detail?.images?.length > 0) {
                setActiveImage(detail.images[0].url);
            }
        }

        fetchProductDetail();
    }, [productId]);

    useEffect(() => {
        const check = () => {
            if (selectedVariant) {
                if (selectedVariant?.images?.length > 0) {
                    setActiveImage(selectedVariant.images[0].url);
                } else {
                    setActiveImage(null);
                }
            } else if (product?.images?.length > 0) {
                setActiveImage(product.images[0].url);
            } else {
                setActiveImage(null);
            }
        }

        check();
    }, [selectedVariant, product]);

    useEffect(() => {
        function checkClick(e) {
            if(loginBoxRef.current && !loginBoxRef.current.contains(e.target)) {
                setHide(true);
            }
        }

        document.addEventListener('mousedown', checkClick);
        return () => document.removeEventListener('mousedown', checkClick);
    }, []);

    const displayProduct = selectedVariant ? {
        ...product,
        title: product?.title,
        description: product?.description,
        price: selectedVariant?.price || product?.price,
        images: selectedVariant?.images?.length > 0 ? selectedVariant.images : product?.images,
        stock: selectedVariant?.stock ?? product?.stock,
    } : product;

    const images = displayProduct?.images ?? [];

    return <main className="min-h-screen w-screen relative flex flex-col items-center lg:gap-7 bg-[#111111]/5">

        <div
        hidden={hide}
        className="absolute h-full w-full bg-black/10 backdrop-blur-md flex justify-center items-center">
            <div 
            ref={loginBoxRef}
            className="bg-white w-80 h-50 rounded-md flex flex-col items-center p-5 justify-between">
                <p className="lg:text-xl text-sm">You are not Logged-In.<br /><span className="lg:text-sm text-black/80 text-xs">Please Login to continue.</span></p>

                <div className="flex items-center w-full justify-around">
                    <Link to='/login' className="lg:text-sm cursor-pointer text-xs px-5 py-0.5 rounded-sm bg-black text-white hover:bg-black/80 duration-300 ease-in-out">Login</Link>
                    
                    <button
                    onClick={() => setHide(true)}
                    className="lg:text-sm cursor-pointer hover:bg-black/80 duration-300 ease-in-out text-xs px-5 py-0.5 rounded-sm bg-black text-white">Cancel</button>
                </div>
            </div>
        </div>

        <nav className="flex items-center w-full justify-between py-5 lg:px-10 px-5">
            <Link to='/' className="flex items-center justify-center lg:gap-3">
                <MdArrowBackIos color="black" size={25} className="cursor-pointer active:scale-90 duration-300 ease-linear" />
                <p className="text-black text-xl tracking-wide">{product?.title || 'Product Detail'}</p>
            </Link>
            <p className="lg:text-3xl text-xl font-bold text-[#6F4E37] tracking-wider">Snitch</p>
        </nav>

        {
            loading === 'product details' ?
                (
                    <p className="text-xl">Loading Details...</p>
                ) :
                (
                    <div className="flex flex-col items-start gap-2">
                        <p className="lg:text-3xl text-xl text-black lg:pl-20 pl-5">Details</p>

                        <DetailsCard
                            product={displayProduct}
                            handleAddToCartClick={async() => {
                                if(!user) {
                                    setHide(false);
                                } else {
                                    await handleAddToCart({
                                        variantId: selectedVariant?._id,
                                        productId
                                    });
                                }
                            }}
                            baseProduct={product}
                            selectedVariant={selectedVariant}
                            setSelectedVariant={setSelectedVariant}
                            images={images}
                            activeImage={activeImage}
                            setActiveImage={setActiveImage} />
                    </div>
                )
        }

        <ToastContainer position="top-right" />
    </main>
};

export default ProductDetail;