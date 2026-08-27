import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        totalCartPrice: 0,
        currency: "INR",
        loading: ""
    },
    reducers: {
        setCart: (state, action) => {
            const cartItems = action.payload.items;
            const totalCartPrice = action.payload.totalCartPrice;
            const currency = action.payload.currency;

            state.cartItems = cartItems;
            state.totalCartPrice = totalCartPrice;
            state.currency = currency;
        },
        addCartItem: (state, action) => {
            state.cartItems.push(action.payload);
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

export const { setCart, addCartItem, setLoading, incrementItemQty, decrementItemQty, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;