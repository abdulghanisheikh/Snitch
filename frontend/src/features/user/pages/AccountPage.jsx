import Navbar from '../../../shared/components/Navbar';
import { useProduct } from '../../products/hooks/useProduct.js';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import SellerProduct from '../../products/components/SellerProduct.jsx';
import ProductCreateLoader from '../../products/components/ProductCreateLoader.jsx';

const AccountPage = () => {
    const { handleGetSellerProducts } = useProduct();

    const sellerProducts = useSelector(state => state.product.sellerProducts);
    const loading = useSelector(state => state.product.loading);
    const user = useSelector(state => state.auth.user);

    const initSellerProducts = async() => await handleGetSellerProducts();

    useEffect(() => {
        initSellerProducts();
    }, []);

    return <main className="h-screen w-screen flex flex-col bg-[#111111]/5">
        <Navbar pageName="Account" />

        {
            user.role === 'seller' && loading === 'seller products' ? (
                <section className="flex flex-col items-center justify-center w-screen px-5 lg:px-20 mt-15">
                    <ProductCreateLoader />
                    <p className="text-lg">Loading Products</p>
                </section>
            ) : (
                <section className="flex flex-col px-15 py-2 gap-3">
                    <p className="text-lg tracking-wide self-start lg:ml-10">Your Listed Products</p>
        
                    <div className="flex lg:flex-row flex-col h-full w-full justify-start items-center gap-5 py-2">
                        {
                            sellerProducts.length === 0 ?
                                <p className='font-semibold text-lg'>No Products Listed</p> :
                                sellerProducts.map((product, index) => <SellerProduct key={index} product={product} />)
                        }
                    </div>
                </section>
            )
        }
    </main>
}

export default AccountPage