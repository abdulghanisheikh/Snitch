import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        sellerProducts: [],
        products: [],
        productDetails: null,
        loading: ""
    },
    reducers: {
        setSellerProducts: (state, action) => {
            state.sellerProducts = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setProductDetails: (state, action) => {
            state.productDetails = action.payload;
        }
    }
});

export const { setSellerProducts, setLoading, setProducts, setProductDetails } = productSlice.actions;
export default productSlice.reducer;