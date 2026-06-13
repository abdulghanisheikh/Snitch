import AppRoutes from "./AppRoutes";
import { useEffect } from "react";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useSelector } from "react-redux";

const App = () => {
	const {handleGetMe} = useAuth();

	const user = useSelector(state => state.auth.user);

	console.log("User:", user);
	
	useEffect(() => {
		handleGetMe();
	}, []);
	
	return <AppRoutes></AppRoutes>
}

export default App;