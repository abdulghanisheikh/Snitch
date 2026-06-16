import { MdArrowBackIos } from "react-icons/md";
import {Link} from "react-router";

const Navbar = () => {
    return <nav className="flex items-center w-full justify-between py-3 px-10">
        <div className="flex items-center justify-center gap-3">
            <Link to='/'>
                <MdArrowBackIos color="black" size={25} className="cursor-pointer active:scale-90 duration-300 ease-linear" />
            </Link>
            <p className="text-black text-lg tracking-wide">List Item</p>
        </div>
        <p className="text-3xl font-bold text-[#6F4E37] tracking-wider">Snitch</p>
    </nav>
}

export default Navbar;