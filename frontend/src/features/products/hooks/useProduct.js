import { useDispatch } from "react-redux"
import { createProduct, getSellerProducts } from "../services/products.api.js";
import { toast } from "react-toastify";
import { setLoading, setSellerProducts } from "../states/products.slice.js";

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
            return {error: err.response?.data?.message || "Error in creating product"};
        } finally {
            dispatch(setLoading(''));
        }
    };

    const handleGetSellerProducts = async() => {
        try {
            dispatch(setLoading('product'));
            const {data} = await getSellerProducts();

            const {success, products} = data;
            if(success) {
                dispatch(setSellerProducts(products));
            }

            return data;
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in creating product");

            return { error: err.response?.data?.message || "Error in creating product" };
        } finally {
            dispatch(setLoading(''));
        }
    }

    return {handleCreateProduct, handleGetSellerProducts};
}