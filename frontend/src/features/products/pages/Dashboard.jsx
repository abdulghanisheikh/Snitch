import Navbar from "../../../shared/components/Navbar";
import { useEffect } from "react";
import { useProduct } from "../hooks/useProduct";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const { handleGetSellerProducts } = useProduct();

    const sellerProducts = useSelector(state => state.product.sellerProducts);

    useEffect(() => {
        handleGetSellerProducts();
    }, []);

    return <main className="h-screen w-screen flex flex-col">
        <Navbar />

        <section className="flex flex-col px-10 py-2 gap-5">
            <p className="text-4xl">Dashboard</p>

            <div className="flex h-full w-full justify-start items-center gap-3 py-2">
                {
                    sellerProducts.length === 0 ?
                    <p>No Products Listed</p> :
                    sellerProducts.map((p, index) => {
                        return <ProductCard key={index} product={p} />
                    })
                }
            </div>
        </section>
    </main>
}

export default Dashboard;