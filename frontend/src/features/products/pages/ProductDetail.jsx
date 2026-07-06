import { useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link, useParams } from "react-router";
import { useProduct } from "../hooks/useProduct";
import { useSelector } from "react-redux";
import DetailsCard from "../components/DetailsCard";

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [activeImage, setActiveImage] = useState(null);
    const loading = useSelector(state => state.product.loading);

    const { handleGetProductDetails } = useProduct();
    const { productId } = useParams();

    useEffect(() => {
        const fetchProductDetail = async () => {
            const detail = await handleGetProductDetails(productId);
            setProduct(detail);
            
            if (detail?.images?.length > 0) {
                setActiveImage(detail.images[0].url);
            }
        }

        fetchProductDetail();
    }, [productId]);

    const images = product?.images ?? [];

    return <main className="min-h-screen w-screen flex flex-col items-center lg:gap-10 bg-[#111111]/5">
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
                        <DetailsCard product={product} images={images} activeImage={activeImage} setActiveImage={setActiveImage} />
                    )
                }
            </main>
};

export default ProductDetail;