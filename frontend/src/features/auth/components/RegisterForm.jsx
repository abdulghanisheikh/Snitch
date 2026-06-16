import {Link} from "react-router";
import GoogleLoginButton from "./GoogleLoginButton";

const RegisterForm = ({userInput, setUserInput, handleRegisterClick, loading}) => {
  return (
    <form 
    onSubmit={handleRegisterClick}
    className="bg-white text-black lg:text-sm text-xs lg:w-1/3">
      
      <div className="flex flex-col py-4 px-8">
        <h2 className="text-4xl font-semibold text-center text-[#4a270d]">
          Register
        </h2>

        <div className="self-center mt-5">
          <GoogleLoginButton />
        </div>

        <div className="flex items-center gap-2 mt-4">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
          <span className="text-sm font-medium">Or</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
        </div>

        <div className="mt-4">
          <div className="relative">
            <label
              className="block font-medium"
              htmlFor="email"
            >
              Email
            </label>
            <input
              value={userInput.email}
              onChange={(e) => setUserInput({...userInput, [e.target.name]: e.target.value})}
              placeholder="you@example.com"
              className="block w-full px-4 py-2 mt-1 border outline-none border-black rounded-lg"
              name="email"
              id="email"
              type="email"
            />
          </div>

          <div className="mt-4">
            <label
              className="block font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              value={userInput.password}
              onChange={(e) => setUserInput({...userInput, [e.target.name]: e.target.value})}
              placeholder="••••••••"
              className="block w-full px-4 py-2 mt-1 border outline-none border-black rounded-lg"
              name="password"
              id="password"
              type="password"
            />
          </div>

          <div className="mt-4">
            <label
              className="block font-medium"
              htmlFor="fullname"
            >
              Full Name
            </label>
            <input
              value={userInput.fullname}
              onChange={(e) => setUserInput({...userInput, [e.target.name]: e.target.value})}
              placeholder="Enter your full name"
              className="block w-full px-4 py-2 mt-1 border outline-none border-black rounded-lg"
              name="fullname"
              id="fullname"
              type="text"
            />
          </div>

          <div className="mt-4">
            <label
              className="block font-medium"
              htmlFor="contact"
            >
              Contact
            </label>
            <input
              value={userInput.contact}
              onChange={(e) => setUserInput({...userInput, [e.target.name]: e.target.value})}
              placeholder="Enter your contact number"
              className="block w-full px-4 py-2 mt-1 border outline-none border-black rounded-lg"
              name="contact"
              id="contact"
              type="text"
            />
          </div>

          <div className="mt-5 ml-1.5 flex items-center gap-1.5">
            <input
            type="checkbox"
            checked={userInput.isSeller}
            className="h-4 w-4 cursor-pointer"
            onChange={(e) => setUserInput({...userInput, isSeller: e.target.checked})}
            />

            <p>Register as Seller</p>
          </div>

          <div className="mt-3">
            <button
              className="w-full px-4 py-3 tracking-tight text-white bg-black active:scale-90 duration-300 ease-in-out outline-none cursor-pointer"
              type="submit"
            >
              {loading === "register" ? "Creating..." : "Create Account"}
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 py-2">
        <div className="text-black text-center">
          Already have an account? {` `}
          <Link to="/login" className="font-medium underline text-blue-500">
            Login In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;