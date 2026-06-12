import {createSlice} from "react-redux";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        product: null,
        loading: ""
    },
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});