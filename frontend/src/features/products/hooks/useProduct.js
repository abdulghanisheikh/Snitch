import { useSelector } from "react-redux"
import { createProduct } from "../services/products.api.js";


export const useProduct = () => {
    const loading = useSelector(state => state.product.loading);

    const handleCreateProduct = ({title, description, priceCurrency, priceAmount, images}) => {
        try {
            
        } catch(err) {
            
        }
    };

    return {handleCreateProduct};
}