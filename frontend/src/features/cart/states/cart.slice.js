import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        loading: ''
    },
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
        addItems: (state, action) => {
            state.items.push(action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setItems, setLoading, addItems } = cartSlice.actions;
export default cartSlice.reducer;