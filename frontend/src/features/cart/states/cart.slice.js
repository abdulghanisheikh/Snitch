import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        totalPrice: 0,
        currency: "INR",
        loading: ''
    },
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        },
        addCartItem: (state, action) => {
            state.cartItems.push(action.payload);
        },
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload;
        },
        removeCartItem: (state, action) => {
            const { productId, variantId } = action.payload;

            state.cartItems = state.cartItems.filter(item => {
                const isProductIdMatch = item.product._id === productId;
                const isVariantIdMatch = (item.variant ?? null) === (variantId ?? null);

                return !(isProductIdMatch && isVariantIdMatch);
            });
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        incrementItemQty: (state, action) => {
            const { productId, variantId } = action.payload;

            state.cartItems = state.cartItems.map(item => {
                if(item.product._id === productId || item.variant === variantId) {
                    return { ...item, quantity: item.quantity + 1 };
                } else {
                    return item;
                }
            });
        },
        decrementItemQty: (state, action) => {
            const { productId, variantId } = action.payload;

            state.cartItems = state.cartItems.map(item => {
                if(item.product._id === productId || item.variant === variantId) {
                    return { ...item, quantity: item.quantity - 1 };
                } else {
                    return item;
                }
            });
        }
    }
});

export const { setCartItems, addCartItem, setLoading, incrementItemQty, decrementItemQty, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;