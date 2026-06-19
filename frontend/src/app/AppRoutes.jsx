import { Routes, Route } from "react-router";
import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";
import CreateProductPage from "../features/products/pages/CreateProductPage";
import SellerProtected from "../features/auth/components/SellerProtected";
import Protected from "../features/auth/components/Protected";
import Dashboard from "../features/products/pages/Dashboard";
import AccountPage from "../features/user/pages/AccountPage";

const AppRoutes = () => {
	return <Routes>
		<Route path="/register" element={<RegisterPage />}></Route>
		<Route path="/login" element={<LoginPage />}></Route>
		
		<Route path="/" element={
			<Protected>
				<Dashboard />
			</Protected>
		}>
		</Route>

		<Route path="/seller">
			<Route path="create-product" element={
				<SellerProtected>
					<CreateProductPage />
				</SellerProtected>
			}></Route>
		</Route>

		<Route path="/account" element={
			<Protected>
				<AccountPage />
			</Protected>
		}>
		</Route>
	</Routes>
}

export default AppRoutes;