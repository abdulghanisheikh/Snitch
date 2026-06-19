import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const SellerProtected = ({children}) => {
    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.auth.loading);

    if(loading !== '') {
        return <div className="text-3xl text-white flex justify-center items-center h-screen w-screen">
            <p>Loading....</p>
        </div>
    }

    if(!user) {
        return <Navigate to='/login' />;
    }

    if(user.role !== 'seller') {
        return <Navigate to='/' />;
    }

    return children;
}

export default SellerProtected;