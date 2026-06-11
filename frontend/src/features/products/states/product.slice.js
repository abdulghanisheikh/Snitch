import {createSlice} from "react-redux";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        product: null
    },
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload;
        }
    }
});