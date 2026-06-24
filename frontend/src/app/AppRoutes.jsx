import { Routes, Route } from "react-router";
import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";
import CreateProductPage from "../features/products/pages/CreateProductPage";
import SellerProtected from "../features/auth/components/SellerProtected";
import Protected from "../features/auth/components/Protected";
import AccountPage from "../features/user/pages/AccountPage";
import Home from "../features/products/pages/Home";
import ProductDetail from "../features/products/pages/ProductDetail";
import EditSellerProduct from "../features/products/components/EditSellerProduct";

const AppRoutes = () => {
	return <Routes>
		<Route path="/register" element={ <RegisterPage /> }></Route>
		<Route path="/login" element={ <LoginPage /> }></Route>
		<Route path="/" element={ <Home /> }></Route>

		<Route path='/product/:productId' element={ <ProductDetail /> }></Route>
		<Route path='/product/:sellerProductId' element={
			<SellerProtected>
				<EditSellerProduct />
			</SellerProtected>
		}></Route>

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
		}></Route>
	</Routes>
}

export default AppRoutes;