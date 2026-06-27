import { MdArrowBackIos } from "react-icons/md";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { CgLogOut } from "react-icons/cg";
import { useAuth } from "../../features/auth/hooks/useAuth.js";
import { IoIosLogIn } from "react-icons/io";

const Navbar = ({ pageName, backTo }) => {
    const user = useSelector(state => state.auth.user);
    const { handleLogoutUser } = useAuth();

    return <nav className="flex items-center w-full justify-between lg:py-5 py-2 lg:px-10 px-2">
        <Link to={backTo} className="flex items-center justify-center lg:gap-3">
            {
                pageName !== 'Shop' && <MdArrowBackIos color="black" size={25} className="cursor-pointer active:scale-90 duration-300 ease-linear" />
            }
            <p className="text-black lg:text-lg text-md tracking-wide cursor-pointer">{pageName}</p>
        </Link>

        <div className="lg:flex items-center lg:gap-8 hidden">
            <Link to='/' className="flex flex-col items-center cursor-pointer justify-center gap-1">
                <MdOutlineSpaceDashboard size={21} />
                <p className="text-xs">Shop</p>
            </Link>

            {
                user?.role === 'seller' && <Link to='/seller/create-product' className="flex flex-col cursor-pointer items-center justify-center gap-1">
                    <IoMdCreate size={21} />
                    <p className="text-xs">List Product</p>
                </Link>
            }

            {
                user && <Link to='/account' className="flex flex-col items-center justify-center gap-1 cursor-pointer">
                    <VscAccount size={21} />
                    <p className="text-xs">Account</p>
                </Link>
            }
            
            {
                user ? (
                    <div
                    onClick={() => handleLogoutUser()}
                    className="flex flex-col items-center justify-center gap-1 cursor-pointer">
                        <CgLogOut size={21} />
                        <p className="text-xs">Logout</p>
                    </div>
                ) : (
                    <Link
                    to='/login'
                    className="flex flex-col items-center justify-center gap-1 cursor-pointer">
                        <IoIosLogIn size={21} />
                        <p className="text-xs">Login</p>
                    </Link>
                )
            }
        </div>

        <p className="lg:text-3xl text-lg font-bold text-[#6F4E37] tracking-wider">Snitch</p>
    </nav>
}

export default Navbar;