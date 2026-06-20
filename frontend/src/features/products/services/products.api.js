import axios from "axios";

const productApiInstance = axios.create({
    baseURL: '/api/product',
    withCredentials: true
});

export const createProduct = async(formData) => {
    const response = await productApiInstance.post("/", formData);
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