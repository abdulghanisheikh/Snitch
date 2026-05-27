import {Routes, Route} from "react-router";
import RegisterPage from "../features/auth/pages/RegisterPage";
import LoginPage from "../features/auth/pages/LoginPage";

const AppRoutes = () => {
  return <Routes>
    <Route path="/" element={<div className="text-white bg-black h-screen w-screen flex text-3xl">
        <p className="font-semibold mt-5 ml-5">Hello world</p>
    </div>}></Route>
    <Route path="/register" element={<RegisterPage />}></Route>
    <Route path="/login" element={<LoginPage />}></Route>
  </Routes>
}

export default AppRoutes;