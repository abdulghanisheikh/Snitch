import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        loading: ''
    },
    reducers: {
        setItems: (state, action) => {
            state.cartItems = action.payload;
        },
        addItem: (state, action) => {
            state.cartItems.push(action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setItems, addItem, setLoading } = cartSlice.actions;
export default cartSlice.reducer;