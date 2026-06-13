import { Routes, Route } from "react-router";
import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";
import CreateProductPage from "../features/products/pages/CreateProductPage";
import SellerProtected from "../features/auth/components/SellerProtected";
import Protected from "../features/auth/components/Protected";

const AppRoutes = () => {
	return <Routes>
		<Route path="/" element={<Protected>
			<div className="h-screen w-screen flex bg-zinc-900 justify-center items-center">
				<p className="text-blue-500 text-7xl font-semibold">Welcome to Snitch</p>
			</div>
		</Protected>}>
		</Route>
		<Route path="/register" element={<RegisterPage />}></Route>
		<Route path="/login" element={<LoginPage />}></Route>
		<Route path="/seller/create-product" element={
			<SellerProtected>
				<CreateProductPage />
			</SellerProtected>
		}></Route>
	</Routes>
}

export default AppRoutes;