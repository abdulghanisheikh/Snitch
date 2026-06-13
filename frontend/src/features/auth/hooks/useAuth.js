import { registerUser, loginUser, getMe } from "../services/auth.api.js";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "../state/auth.slice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegisterUser = async({email, contact, fullname, password, isSeller = false}) => {
        try {
            dispatch(setLoading("register"));

            const {data} = await registerUser({email, contact, fullname, password, isSeller});

            const {success, message, user} = data;

            if(success) {
                dispatch(setUser(user));
                toast.success(message, {
                    autoClose: 1500
                });

                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }

            return data;
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in user registration");
        } finally {
            dispatch(setLoading(""));
        }
    }

    const handleLoginUser = async({email, password}) => {
        try {
            dispatch(setLoading("login"));

            const {data} = await loginUser({email, password});

            const {success, message, user} = data;

            if(success) {
                dispatch(setUser(user));

                toast.success(message, {
                    autoClose: 1500
                });

                setTimeout(() => {
                    navigate('/')
                }, 2000);
            }

            return data;
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in user login");
        } finally {
            dispatch(setLoading(""));
        }
    }

    const handleGetMe = async() => {
        try {
            dispatch(setLoading('get me'));

            const {data} = await getMe();

            const {success, user} = data;
            if(success) {
                dispatch(setUser(user));
            }

            return data;
        } catch(err) {
            toast.error(err.response?.data?.message || "Error in fetching user data");
        } finally {
            dispatch(setLoading(''));
        }
    }

    return { handleRegisterUser, handleLoginUser, handleGetMe };
}