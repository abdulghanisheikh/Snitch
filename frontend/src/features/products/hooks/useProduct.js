import { useDispatch } from "react-redux"
import { createProduct, getAllProducts, getSellerProducts, getProductDetails, addProductVariant, deleteProduct, deleteProductVariant } from "../services/products.api.js";
import { toast } from "react-toastify";
import { setLoading, setSellerProducts, setProducts } from "../states/products.slice.js";

export const useProduct = () => {
    const dispatch = useDispatch();

    const handleCreateProduct = async(formData) => {
        try {
            dispatch(setLoading('product'));
            const {data} = await createProduct(formData);

            const {success, message} = data;

            if(success) {
                toast.success(message);
            }

            return data;
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in creating product");
        } finally {
            dispatch(setLoading(''));
        }
    };

    const handleGetSellerProducts = async() => {
        try {
            dispatch(setLoading('seller products'));
            const {data} = await getSellerProducts();

            const {success, products} = data;
            if(success) {
                dispatch(setSellerProducts(products));
            }

            return data;
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in creating product");
        } finally {
            dispatch(setLoading(''));
        }
    }

    const handleGetAllProducts = async() => {
        try {
            dispatch(setLoading('products'));

            const {data} = await getAllProducts();

            const {success, products} = data;

            if(success) {
                dispatch(setProducts(products));
            }

            return data;
        } catch(err) {
            console.log(err.response?.data?.message || "Error in fetching all products");
        }
    }

    const handleGetProductDetails = async(productId) => {
        try {
            dispatch(setLoading('product details'));

            const {data} = await getProductDetails(productId);
            const {success, productDetails} = data;

            if(success) {
                return productDetails;
            }
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in getting product details");
        } finally {
            dispatch(setLoading(''));
        }
    }

    const handleAddProductVariant = async({ productId, stock, images, attributes, priceAmount }) => {
        try {
            dispatch(setLoading('variant'));

            const { data } = await addProductVariant({ productId, stock, images, attributes, priceAmount });
            const { success, message } = data;

            if(success) {
                toast.success(message);
            }

            return data;
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in adding product variant");
        } finally {
            dispatch(setLoading(''));
        }
    }

    const handleDeleteProduct = async(productId) => {
        try {
            dispatch(setLoading('delete'));

            const { data } = await deleteProduct(productId);

            const { success, message } = data;
            if(success) {
                toast.success(message);
                await handleGetSellerProducts();
            }
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in deleting the product");
        } finally {
            dispatch(setLoading(''));
        }
    }

    const handleDeleteProductVariant = async({ productId, index }) => {
        try {
            dispatch(setLoading('delete variant'));

            const { data } = await deleteProductVariant({ productId, index });

            const { success, message } = data;
            if(success) toast.success(message);

            return data;
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in deleting variant");
            return { success: false };
        } finally {
            dispatch(setLoading(''));
        }
    }

    return { handleCreateProduct, handleGetSellerProducts, handleGetAllProducts, handleGetProductDetails, handleAddProductVariant, handleDeleteProduct, handleDeleteProductVariant };
}