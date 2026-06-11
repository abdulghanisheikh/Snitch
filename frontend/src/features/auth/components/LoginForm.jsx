import {Link} from "react-router";
import GoogleLoginButton from "./GoogleLoginButton";

const LoginForm = ({userInput, setUserInput, loading, handleLoginClick}) => {
  return (
    <form 
    onSubmit={handleLoginClick}
    className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-3 border-blue-400 dark:border-blue-800 lg:text-sm text-xs text-white lg:w-1/3">
      
      <div className="flex flex-col py-5 px-8">
        <h2 className="text-4xl tracking-tight font-extrabold text-center text-zinc-800 dark:text-white">
          Login
        </h2>

        <div className="self-center mt-5">
          <GoogleLoginButton />
        </div>

        <div className="flex items-center gap-2 mt-4">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Or</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
        </div>
        
        <div className="mt-6">

          <div className="relative lg:text-sm text-xs">
            <label
              className="block font-medium text-zinc-600 dark:text-zinc-200"
              htmlFor="email"
            >
              Email
            </label>
            <input
              value={userInput.email}
              onChange={(e) => setUserInput({...userInput, [e.target.name]: e.target.value})}
              placeholder="you@example.com"
              className="block w-full px-4 py-2 mt-1 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
              name="email"
              id="email"
              type="email"
            />
          </div>

          <div className="mt-4 lg:text-sm text-xs">
            <label
              className="block font-medium text-zinc-600 dark:text-zinc-200"
              htmlFor="password"
            >
              Password
            </label>
            <input
              value={userInput.password}
              onChange={(e) => setUserInput({...userInput, [e.target.name]: e.target.value})}
              placeholder="••••••••"
              className="block w-full px-4 py-2 mt-1 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
              name="password"
              id="password"
              type="password"
            />
          </div>

          <div className="lg:mt-8 mt-6">
            <button
              className="w-full px-4 py-3 tracking-tight text-white bg-linear-to-r from-blue-600 to-cyan-600 rounded-lg active:scale-90 duration-300 ease-in-out outline-none cursor-pointer"
              type="submit"
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 py-4 mt-5 dark:bg-zinc-800 lg:text-sm text-xs">
        <div className="text-white text-center">
          Did not have an account? {` `}
          <Link to="/register" className="font-medium underline text-blue-300">
            Create Account
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;