import { addToCart, getCart } from "../services/cart.api";
import { setLoading, setItems } from "../states/cart.slice.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export const useCart = () => {    
    const dispatch = useDispatch();

    const handleAddToCart = async({ quantity, variantId, productId }) => {
        try {
            dispatch(setLoading('add cart'));

            const { data } = await addToCart({ quantity, variantId, productId });
            const { success, message } = data;

            if(success) toast.success(message);
            
            return data;
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in adding product to cart.");
            return { success: false };
        } finally {
            dispatch(setLoading(''));
        }
    }

    const handleGetCart = async() => {
        try {
            dispatch(setLoading('cart'));

            const { data } = await getCart();

            const { success, cart } = data;
            if(success) {
                dispatch(setItems(cart.items));
            }
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in fetching cart.");
        } finally {
            dispatch(setLoading(''));
        }
    }

    return { handleAddToCart, handleGetCart };
}