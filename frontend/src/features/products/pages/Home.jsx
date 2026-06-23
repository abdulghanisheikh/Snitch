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

    return <main className="flex flex-col min-h-screen w-screen items-center gap-10">
        <Navbar pageName='Home' />
        
        <div className="flex flex-col gap-3 items-center justify-center">
            <p className="text-5xl opacity-95">Curated Products</p>
            <p className="text-xs lg:text-sm opacity-50">Upgrade your closet with our latest exclusive collection.</p>
        </div>

        <div className="flex items-center flex-wrap lg:justify-start justify-center gap-8 mt-5">
            {
                products.length === 0 ? 
                <p>No products</p> : 
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