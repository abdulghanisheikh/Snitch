import { MdArrowBackIos } from "react-icons/md";
import {Link} from "react-router";
import { useSelector } from "react-redux";

const Navbar = ({pageName}) => {
    const user = useSelector(state => state.auth.user);

    return <nav className="flex items-center w-full justify-between py-3 lg:px-10 px-5">
        <div className="flex items-center justify-center gap-3">
            <Link to='/'>
                <MdArrowBackIos color="black" size={25} className="cursor-pointer active:scale-90 duration-300 ease-linear" />
            </Link>
            <p className="text-black text-lg tracking-wide">{pageName}</p>
        </div>

        <div className="flex items-center lg:text-sm text-xs gap-5">
            <Link to='/seller/dashboard' className="cursor-pointer">Dashboard</Link>
            {
                user.role === 'seller' && <Link to='/seller/create-product' className="cursor-pointer">Create Product</Link>
            }
            <Link className="cursor-pointer" to='/register'>New Account</Link>
            <p className="cursor-pointer" onClick={() => console.log("logout")}>Logout</p>
        </div>

        <p className="text-3xl font-bold text-[#6F4E37] tracking-wider">Snitch</p>
    </nav>
}

export default Navbar;