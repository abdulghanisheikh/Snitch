import RegisterForm from "../components/RegisterForm";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const RegisterPage = () => {
  const [userInput, setUserInput] = useState({
    fullname: "",
    contact: "",
    email: "",
    password: ""
  });

  const loading = useSelector(state => state.auth.loading);
  const {handleRegisterUser} = useAuth();

  const handleRegisterClick = async(e) => {
    e.preventDefault();

    const { fullname, contact, email, password } = userInput;
    const data = await handleRegisterUser({ fullname, contact, email, password });

    const {success} = data;

    if(success) {
      setUserInput({fullname: "", contact: "", email: "", password: ""});
    }
  }

  return <main className="h-screen w-screen flex flex-col bg-zinc-900 justify-center items-center">
    <RegisterForm
      userInput={userInput}
      setUserInput={setUserInput}
      handleRegisterClick={handleRegisterClick}
      loading={loading}
    />
    <ToastContainer position="top-right" />
  </main>
}

export default RegisterPage;