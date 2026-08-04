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
        }
    }
});

export const { setCartItems, addCartItem, setLoading } = cartSlice.actions;
export default cartSlice.reducer;