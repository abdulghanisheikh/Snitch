import { Routes, Route } from "react-router";
import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";
import CreateProductPage from "../features/products/pages/CreateProductPage";
import SellerProtected from "../features/auth/components/SellerProtected";
import Protected from "../features/auth/components/Protected";
import Dashboard from "../features/products/pages/Dashboard";

const AppRoutes = () => {
	return <Routes>
		<Route path="/" element={<Protected>
			<Dashboard />
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