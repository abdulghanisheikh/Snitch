import AppRoutes from "./AppRoutes";
import { useEffect } from "react";
import { useAuth } from "../features/auth/hooks/useAuth";

const App = () => {
	const {handleGetMe} = useAuth();

	useEffect(() => {
		handleGetMe();
	}, []);
	
	return <AppRoutes></AppRoutes>;
}

export default App;