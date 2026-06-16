import Navbar from "../../../shared/components/Navbar";
import { useEffect } from "react";
import { useProduct } from "../hooks/useProduct";
import ProductCard from "../components/ProductCard";

const Dashboard = () => {
    const { handleGetSellerProducts } = useProduct();

    useEffect(() => {
        handleGetSellerProducts();
    }, []);

    return <main className="h-screen w-screen flex flex-col">
        <Navbar />

        <section className="flex flex-col px-10 py-2 gap-5">
            <p className="text-4xl">Welcome to <span className="text-[#6F4E37] font-semibold">Snitch</span></p>

            <div className="flex h-full w-full justify-start items-center gap-3 py-2">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </section>
    </main>
}

export default Dashboard;