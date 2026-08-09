import LoginForm from "../components/LoginForm";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth.js";
import { ToastContainer } from "react-toastify";
import { Link, Navigate } from "react-router";
import { CiShoppingCart } from "react-icons/ci";

const LoginPage = () => {
	const [userInput, setUserInput] = useState({
		email: "",
		password: ""
	});
	const { handleLoginUser } = useAuth();

	const loading = useSelector(state => state.auth.loading);
	const user = useSelector(state => state.auth.user);

	if(!loading && user) {
		return <Navigate to='/'></Navigate>;
	}

	const handleLoginClick = async (e) => {
		e.preventDefault();

		const { email, password } = userInput;
		const data = await handleLoginUser({ email, password });

		const { success } = data;

		if (success) {
			setUserInput({ email: "", password: "" });
		}
	}

	return <main className="min-h-screen w-screen flex flex-col items-center">

		<header className="flex w-full items-center px-10 py-3 justify-end gap-7">
			<Link to='/'>
				<CiShoppingCart size={24} />
			</Link>
			<h1 className="text-[#6F4E37] text-3xl">Snitch</h1>
		</header>

		<LoginForm
			userInput={userInput}
			setUserInput={setUserInput}
			loading={loading}
			handleLoginClick={(e) => handleLoginClick(e)}
		/>

		<ToastContainer position="top-right" />
	</main>
}

export default LoginPage;