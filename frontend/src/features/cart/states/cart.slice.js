import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        loading: ''
    },
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        },
        addCartItem: (state, action) => {
            state.cartItems.push(action.payload);
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

export const { setCartItems, addCartItem, setLoading, incrementItemQty, decrementItemQty } = cartSlice.actions;
export default cartSlice.reducer;