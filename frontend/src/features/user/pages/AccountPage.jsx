import Navbar from '../../../shared/components/Navbar';
import { useProduct } from '../../products/hooks/useProduct.js';
import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import SellerProduct from '../../products/components/SellerProduct.jsx';
import Loader from '../../products/components/Loader.jsx';
import { ToastContainer } from 'react-toastify';
import ConfirmDelete from "../../../shared/components/ConfirmDelete.jsx";

const AccountPage = () => {
    const { handleGetSellerProducts, handleDeleteProduct } = useProduct();
    const [productToDelete, setProductToDelete] = useState(null);

    const deleteBoxRef = useRef(null);

    const sellerProducts = useSelector(state => state.product.sellerProducts);
    const loading = useSelector(state => state.product.loading);
    const user = useSelector(state => state.auth.user);

    const initSellerProducts = async() => await handleGetSellerProducts();

    const handleConfirmDelete = (product) => {
        setProductToDelete(product);
    }

    const checkClickOutside = (e) => {
        if(deleteBoxRef.current && !deleteBoxRef.current.contains(e.target)) {
            setProductToDelete("");
        }
    }

    useEffect(() => {
        if(user.role === "seller") {
            initSellerProducts();
        }

        document.addEventListener('mousedown', checkClickOutside);
        return () => document.removeEventListener('mousedown', checkClickOutside);
    }, []);

    return <main className="relative h-screen w-screen flex flex-col bg-[#111111]/5">
        <Navbar pageName="Account" backTo='/' />

        {
            productToDelete && (
                <div className='backdrop-blur-sm bg-black/20 absolute z-5 h-screen w-screen flex items-center justify-center'>
                    <ConfirmDelete
                    loading={loading}
                    heading='Delete Product ?'
                    deleteBoxRef={deleteBoxRef} 
                    product={productToDelete}
                    closeDeleteBox={() => setProductToDelete(null)}
                    deleteCallback={async() => {
                        await handleDeleteProduct(productToDelete._id);
                        setProductToDelete(null);
                    }} />
                </div>
            )
        }

        {
            user.role === 'seller' && loading === 'seller products' ? (
                <section className="flex flex-col items-center justify-center w-screen px-5 lg:px-20 mt-15">
                    <Loader />
                    <p className="text-lg">Loading Products</p>
                </section>
            ) : (
                <section className="flex flex-col px-15 py-2 lg:gap-3">
                    <p className="text-3xl tracking-wide self-center lg:mt-3">Your Listed Products</p>
        
                    <div className="flex lg:flex-row flex-col h-full w-full justify-start items-center gap-5 py-2">
                        {
                            sellerProducts.length === 0 ?
                                <p className='w-full lg:text-sm text-xs lg:mt-5 text-center'>No Products Yet.</p> :
                                sellerProducts.map((product, index) => 
                                <SellerProduct 
                                key={index} 
                                product={product}
                                loading={loading}
                                handleDeleteClick={() => handleConfirmDelete(product)} />
                            )
                        }
                    </div>
                </section>
            )
        }
        <ToastContainer position='top-right' />
    </main>
}

export default AccountPage