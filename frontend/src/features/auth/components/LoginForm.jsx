import {Link} from "react-router";
import GoogleLoginButton from "./GoogleLoginButton";

const LoginForm = ({userInput, setUserInput, loading, handleLoginClick}) => {
  return (
    <form 
    onSubmit={handleLoginClick}
    className="bg-white text-black overflow-hidden lg:text-sm text-xs lg:w-1/3">
      
      <div className="flex flex-col py-5 px-8">
        <h2 className="text-4xl font-semibold text-center text-[#4a270d]">
          Login
        </h2>

        <div className="self-center mt-5">
          <GoogleLoginButton />
        </div>

        <div className="flex items-center gap-2 mt-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-black font-medium">Or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>
        
        <div className="mt-6">

          <div className="relative lg:text-sm text-xs">
            <label
              className="block font-medium text-black"
              htmlFor="email"
            >
              Email
            </label>
            <input
              value={userInput.email}
              onChange={e => setUserInput({...userInput, [e.target.name]: e.target.value})}
              placeholder="you@example.com"
              className="block w-full px-4 py-2 mt-1 text-black bg-white rounded-lg outline-none border border-black"
              name="email"
              id="email"
              type="email"
            />
          </div>

          <div className="mt-4 lg:text-sm text-xs">
            <label
              className="block font-medium text-black"
              htmlFor="password"
            >
              Password
            </label>
            <input
              value={userInput.password}
              onChange={e => setUserInput({...userInput, [e.target.name]: e.target.value})}
              placeholder="••••••••"
              className="block w-full px-4 py-2 mt-1 text-black border rounded-lg border-black outline-none"
              name="password"
              id="password"
              type="password"
            />
          </div>

          <div className="lg:mt-8 mt-6">
            <button
              className="w-full px-4 py-3 tracking-tight text-white bg-black active:scale-90 duration-300 ease-in-out outline-none cursor-pointer"
              type="submit"
            >
              {loading === "login" ? "Logging In..." : "Log In"}
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 py-2">
        <div className="text-black text-center">
          Did not have an account? {` `}
          <Link to="/register" className="font-medium underline text-blue-600">
            Create Account
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;