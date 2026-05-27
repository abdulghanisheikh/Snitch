import { registerUser } from "../services/auth.api.js";
import { useDispatch } from "react-redux";
import { setLoading, setUser, setError } from "../state/auth.slice.js";
import { toast } from "react-toastify";

export const useAuth = () => {
    const dispatch = useDispatch();

    const handleRegisterUser = async({email, contact, fullname, password, isSeller = false}) => {
        try {
            dispatch(setLoading(true));

            const {data} = await registerUser({email, contact, fullname, password, isSeller});

            const {success, message, user} = data;
            
            if(success) {
                setUser(user);
                toast.success(message);
            }

            return data;
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in user registration");
            dispatch(setError(err.response?.data?.message || "Error in user registration"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    return { handleRegisterUser };
}