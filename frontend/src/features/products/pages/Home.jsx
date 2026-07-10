import Navbar from "../../../shared/components/Navbar";
import { useEffect } from "react";
import { useProduct } from "../hooks/useProduct";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

const Home = () => {
    const products = useSelector(state => state.product.products);
    const { handleGetAllProducts } = useProduct();

    const navigate = useNavigate();

    useEffect(() => {
        handleGetAllProducts();
    }, []);

    return <main className="flex flex-col min-h-screen w-screen items-center justify-start bg-[#111111]/5">
        <Navbar pageName='Shop' />
        
        <div className="flex flex-col gap-2 items-center justify-center w-full mt-2">
            <p className="lg:text-5xl text-2xl opacity-95">Curated Products</p>
            <p className="text-xs lg:text-sm opacity-60">Upgrade your closet with our latest exclusive collection.</p>
        </div>

        <div className="flex lg:flex-row flex-col items-center lg:flex-wrap lg:justify-start justify-center w-full lg:gap-8 gap-5 mt-5 lg:px-10 py-5">
            {
                products.length === 0 ? 
                <p className="w-full text-center lg:text-sm text-xs">No products Yet.</p> : 
                products.map((product, index) => {
                    return <ProductCard
                    product={product} 
                    key={index}
                    handleOnClick={() => navigate(`/product/${product._id}`)}
                    />
                })
            }
        </div>
        
        <ToastContainer position="top-right" />
    </main>
}

export default Home;