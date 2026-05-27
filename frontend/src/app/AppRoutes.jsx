import {Routes, Route} from "react-router";
import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";

const AppRoutes = () => {
  return <Routes>
    <Route path="/" element={<div className="h-screen w-screen flex bg-zinc-900 justify-center items-center">
        <p className="text-white text-3xl">Welcome to the App</p>
    </div>}>
    </Route>
    <Route path="/register" element={<RegisterPage />}></Route>
    <Route path="/login" element={<LoginPage />}></Route>
  </Routes>
}

export default AppRoutes;