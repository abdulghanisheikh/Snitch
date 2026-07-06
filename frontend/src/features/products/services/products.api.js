import axios from "axios";

const productApiInstance = axios.create({
    baseURL: '/api/product',
    withCredentials: true
});

export const createProduct = async(formData) => {
    const response = await productApiInstance.post("/", formData);
    return response;
}

export const updateProduct = async(productId, formData) => {
    const response = await productApiInstance.put(`/${productId}`, formData);
    return response;
}

export const getSellerProducts = async() => {
    const response = await productApiInstance.get("/seller");
    return response;
}

export const getAllProducts = async() => {
    const response = await productApiInstance.get("/");
    return response;
}

export const getProductDetails = async(productId) => {
    const response = await productApiInstance.get(`/${productId}`);
    return response;
}

export const addProductVariant = async({ productId, images, stock, attributes, priceAmount }) => {
    const formData = new FormData();
    
    formData.append('photos', images);
    formData.append('stock', stock);
    formData.append('priceAmount', priceAmount);
    formData.append('attributes', attributes);

    const response = await productApiInstance.post(`/${productId}/variant`, formData);
    return response;
}