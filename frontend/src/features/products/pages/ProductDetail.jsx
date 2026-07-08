import { useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link, useParams } from "react-router";
import { useProduct } from "../hooks/useProduct";
import { useSelector } from "react-redux";
import DetailsCard from "../components/DetailsCard";

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [activeImage, setActiveImage] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const loading = useSelector(state => state.product.loading);

    const { handleGetProductDetails } = useProduct();
    const { productId } = useParams();

    useEffect(() => {
        const fetchProductDetail = async () => {
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

    const displayProduct = selectedVariant ? {
        ...product,
        title: product?.title,
        description: product?.description,
        price: selectedVariant?.price || product?.price,
        images: selectedVariant?.images?.length > 0 ? selectedVariant.images : product?.images,
        stock: selectedVariant?.stock ?? product?.stock,
    } : product;

    const images = displayProduct?.images ?? [];

    return <main className="min-h-screen w-screen flex flex-col items-center lg:gap-7 bg-[#111111]/5">
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
                        <div className="flex flex-col items-start gap-3">
                            <p className="lg:text-5xl text-xl text-[#4a270d] lg:pl-20">Details</p>

                            <DetailsCard 
                            product={displayProduct}
                            baseProduct={product}
                            selectedVariant={selectedVariant}
                            setSelectedVariant={setSelectedVariant}
                            images={images}
                            activeImage={activeImage}
                            setActiveImage={setActiveImage} />
                        </div>
                        
                    )
                }
            </main>
};

export default ProductDetail;