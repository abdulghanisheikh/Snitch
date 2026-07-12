import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        loading: ''
    },
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setCart, setLoading } = cartSlice.actions;
export default cartSlice.reducer;