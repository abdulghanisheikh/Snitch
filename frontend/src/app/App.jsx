import AppRoutes from "./AppRoutes";
import { useEffect } from "react";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useCart } from "../features/cart/hooks/useCart";
import { useSelector } from "react-redux";

const App = () => {
	const { handleGetMe } = useAuth();
	const { handleGetCart } = useCart();
	const user = useSelector(state => state.auth.user);

	useEffect(() => {
		handleGetMe();
	}, []);

	useEffect(() => {
		if(user) {
			handleGetCart();
		}
	}, [user]);
	
	return <AppRoutes></AppRoutes>;
}

export default App;