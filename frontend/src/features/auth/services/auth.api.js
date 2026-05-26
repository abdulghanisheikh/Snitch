import axios from "axios";

const authApiInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    withCredentials: true
});

export const registerUser = async({email, contact, fullname, password, isSeller}) => {
    const response = await authApiInstance.post("/api/auth/register", {
        email,
        contact,
        fullname,
        password,
        isSeller
    });

    return response;
}