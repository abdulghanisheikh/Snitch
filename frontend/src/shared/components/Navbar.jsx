import { MdArrowBackIos } from "react-icons/md";
import {Link} from "react-router";
import { useSelector } from "react-redux";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { CgLogOut } from "react-icons/cg";

const Navbar = ({ pageName }) => {
    const user = useSelector(state => state.auth.user);

    return <nav className="flex items-center w-full justify-between py-5 lg:px-10 px-5">
        <div className="flex items-center justify-center gap-3">
            <Link to='/'>
                <MdArrowBackIos color="black" size={25} className="cursor-pointer active:scale-90 duration-300 ease-linear" />
            </Link>
            <p className="text-black text-lg tracking-wide">{pageName}</p>
        </div>

        <div className="flex items-center gap-8">
            <div className="flex flex-col items-center cursor-pointer justify-center gap-1">
                <MdOutlineSpaceDashboard size={21} />
                <Link to='/seller/dashboard' className="text-xs">Dashboard</Link>
            </div>

            {
                user.role === 'seller' && <div className="flex flex-col cursor-pointer items-center justify-center gap-1">
                    <IoMdCreate size={21} />
                    <Link to='/seller/create-product' className="text-xs">List Product</Link>
                </div>
            }

            <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
                <VscAccount size={21} />
                <Link className="text-xs" to='/register'>New Account</Link>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
                <CgLogOut size={21} />
                <p className="text-xs" onClick={() => console.log("logout")}>Logout</p>
            </div>
        </div>

        <p className="text-3xl font-bold text-[#6F4E37] tracking-wider">Snitch</p>
    </nav>
}

export default Navbar;