import { MdArrowBackIos } from "react-icons/md";
import {Link} from "react-router";

const Navbar = () => {
    return <nav className="flex items-center w-full justify-between py-3 px-10">
        <div className="flex items-center justify-center gap-3">
            <Link to='/'>
                <MdArrowBackIos color="white" size={25} className="cursor-pointer active:scale-90 duration-300 ease-linear" />
            </Link>
            <p className="text-white text-lg tracking-wide">List Item</p>
        </div>
        <p className="text-xl text-blue-400 tracking-wider font-semibold">Snitch</p>
    </nav>
}

export default Navbar;