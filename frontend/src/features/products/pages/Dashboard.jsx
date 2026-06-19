import Navbar from "../../../shared/components/Navbar";
import { useEffect } from "react";
import { useProduct } from "../hooks/useProduct";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const { handleGetSellerProducts } = useProduct();

    const sellerProducts = useSelector(state => state.product.sellerProducts);

    const initDashboard = async() => {
        await handleGetSellerProducts();
    }

    useEffect(() => {
        initDashboard();
    }, []);

    return <main className="h-screen w-screen flex flex-col">
        <Navbar pageName="Dashboard" />

        <section className="flex flex-col px-15 py-2 gap-3">
            <div className="flex lg:flex-row flex-col h-full w-full justify-start items-center gap-5 py-2">
                {
                    sellerProducts.length === 0 ?
                    <p>No Products Listed</p> :
                    sellerProducts.map((product, index) => <ProductCard key={index} product={product} />)
                }
            </div>
        </section>
    </main>
}

export default Dashboard;