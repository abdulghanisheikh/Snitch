import { addToCart, getCart, updateCart, deleteItemFromCart, createCartOrder } from "../services/cart.api.js";
import { setLoading, incrementItemQty, decrementItemQty, removeCartItem, setCart } from "../states/cart.slice.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export const useCart = () => {
    const dispatch = useDispatch();

    async function handleAddToCart({ variantId, productId }) {
        try {
            dispatch(setLoading('add cart'));

            const { data } = await addToCart({ variantId, productId });
            const {success, message} = data;

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
            dispatch(setLoading("cart"));

            const { data } = await getCart();
            const {cart, success} = data;

            if(success) {
                const {items, totalCartPrice, currency} = cart;
                dispatch(setCart({items, totalCartPrice, currency}));
            }
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in fetching cart.");
        } finally {
            dispatch(setLoading(""));
        }
    }

    async function handleUpdateCart({ productId, variantId, action }) {
        try {
            dispatch(setLoading("update cart"));

            const { data } = await updateCart({ productId, variantId, action });
            const { success } = data;

            if(success) {
                if(action === "inc") {
                    dispatch(incrementItemQty({ productId, variantId }));
                } else if(action === "dec") {
                    dispatch(decrementItemQty({ productId, variantId }));
                }
            }
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in updating item's quantity in cart.");
        } finally {
            dispatch(setLoading(""));
        }
    }

    async function handleDeleteItemFromCart({ productId, variantId }) {
        try {
            dispatch(setLoading("delete cart"));

            const { data } = await deleteItemFromCart({ productId, variantId });
            const { success, message } = data;

            if(success) {
                toast.success(message);
                
                setTimeout(() => {
                    dispatch(removeCartItem({ productId, variantId }));
                }, 1000);
            }
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in removing item from the cart.");
        } finally {
            dispatch(setLoading(""));
        }
    }

    async function handleCreateCartOrder({amount, currency}) {
        try {
            const {data} = await createCartOrder({amount, currency});
            const {success, message, order} = data;

            if(success) {
                toast.success(message);
                console.log("Order:", order);

                return order;
            }
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in creating cart order.");
            return err;
        }
    }

    return { handleAddToCart, handleGetCart, handleUpdateCart, handleDeleteItemFromCart, handleCreateCartOrder };
}