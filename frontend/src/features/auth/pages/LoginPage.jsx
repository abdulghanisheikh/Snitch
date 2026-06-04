import LoginForm from "../components/LoginForm";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth.js";
import { ToastContainer } from "react-toastify";

const LoginPage = () => {
  const loading = useSelector(state => state.auth.loading);
  const {handleLoginUser} = useAuth();

  const [userInput, setUserInput] = useState({
    email: "",
    password: ""
  });

  const handleLoginClick = async(e) => {
    e.preventDefault();

    const {email, password} = userInput;
    const data = await handleLoginUser({email, password});

    const {success} = data;

    if(success) {
      setUserInput({email: "", password: ""});
    }
  }

  return <div className="min-h-screen w-screen flex bg-zinc-900 justify-center items-center">
    <LoginForm 
    userInput={userInput}
    setUserInput={setUserInput}
    loading={loading}
    handleLoginClick={(e) => handleLoginClick(e)}
    />

    <ToastContainer position="top-right"/>
  </div>
}

export default LoginPage;