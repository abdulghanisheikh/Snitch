import { Routes, Route } from "react-router";
import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";
import CreateProductPage from "../features/products/pages/CreateProductPage";
import SellerProtected from "../features/auth/components/SellerProtected";
import Protected from "../features/auth/components/Protected";
import Dashboard from "../features/products/pages/Dashboard";

const AppRoutes = () => {
	return <Routes>
		<Route path="/register" element={<RegisterPage />}></Route>
		<Route path="/login" element={<LoginPage />}></Route>
		<Route path="/" element={
			<Protected>
				<p className="text-4xl">Welcome to <span className="text-[#6F4E37] font-semibold">Snitch</span></p>
			</Protected>
		}>
		</Route>
		<Route path="/seller">
			<Route path="create-product" element={
				<SellerProtected>
					<CreateProductPage />
				</SellerProtected>
			}></Route>

			<Route path="dashboard" element={
				<SellerProtected>
					<Dashboard />
				</SellerProtected>
			}></Route>
		</Route>
	</Routes>
}

export default AppRoutes;