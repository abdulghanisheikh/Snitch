import { addToCart, getCart, updateCart } from "../services/cart.api.js";
import { setLoading, setCartItems } from "../states/cart.slice.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export const useCart = () => {    
    const dispatch = useDispatch();

    async function handleAddToCart({ variantId, productId }) {
        try {
            dispatch(setLoading('add cart'));

            const { data } = await addToCart({ variantId, productId });
            const { success, message } = data;

            if(success) {
                toast.success(message);
                await handleGetCart();
            }
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in adding product to cart.");
        } finally {
            dispatch(setLoading(''));
        }
    }

    async function handleGetCart() {
        try {
            dispatch(setLoading('cart'));

            const { data } = await getCart();
            const { success, cart } = data;

            if(success) {
                dispatch(setCartItems(cart.items));
            }
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in fetching cart.");
        } finally {
            dispatch(setLoading(''));
        }
    }

    async function handleUpdateCart({ productId, variantId, action }) {
        try {
            dispatch(setLoading("update cart"));

            const { data } = await updateCart({ productId, variantId, action });
            const { success } = data;

            if(success) {
                await handleGetCart();
            }
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in updating item's quantity in cart.");
        } finally {
            dispatch(setLoading(""));
        }
    }

    return { handleAddToCart, handleGetCart, handleUpdateCart };
}