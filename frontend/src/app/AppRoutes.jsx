import { Routes, Route } from "react-router";
import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";
import CreateProduct from "../features/products/pages/CreateProduct";
import SellerProtected from "../features/auth/components/SellerProtected";
import Protected from "../features/auth/components/Protected";
import AccountPage from "../features/user/pages/AccountPage";
import Home from "../features/products/pages/Home";
import ProductDetail from "../features/products/pages/ProductDetail";
import AddProductVariant from "../features/products/pages/AddProductVariant";
import Cart from "../features/cart/pages/Cart";
import OrderSuccess from "../features/cart/pages/OrderSuccess";

const AppRoutes = () => {
	return <Routes>
		<Route path="/register" element={ <RegisterPage /> }></Route>
		<Route path="/login" element={ <LoginPage /> }></Route>
		<Route path="/" element={ <Home /> }></Route>

		<Route path='/product/:productId' element={ <ProductDetail /> }></Route>

		<Route path="/seller">
			<Route path="create-product" element={
				<SellerProtected>
					<CreateProduct />
				</SellerProtected>
			}></Route>

			<Route path='product/:productId' element={
				<SellerProtected>
					<AddProductVariant />
				</SellerProtected>
			}></Route>
		</Route>

		<Route path="/account" element={
			<Protected>
				<AccountPage />
			</Protected>
		}></Route>

		<Route path="/cart" element={
			<Protected>
				<Cart />
			</Protected>
		}></Route>

		<Route path="/orderSuccess" element={
			<Protected>
				<OrderSuccess />
			</Protected>
		}></Route>
	</Routes>
}

export default AppRoutes;