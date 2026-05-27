import { registerUser } from "../services/auth.api.js";
import { useDispatch } from "react-redux";
import { setLoading, setUser, setError } from "../state/auth.slice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegisterUser = async({email, contact, fullname, password, isSeller = false}) => {
        try {
            dispatch(setLoading(true));

            const {data} = await registerUser({email, contact, fullname, password, isSeller});

            const {success, message, user} = data;

            if(success) {
                setUser(user);
                toast.success(message, {
                    autoClose: 2000
                });

                setTimeout(() => {
                    navigate('/');
                }, 2000);
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