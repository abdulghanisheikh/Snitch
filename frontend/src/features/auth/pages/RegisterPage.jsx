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
    password: "",
    isSeller: false
  });

  const loading = useSelector(state => state.auth.loading);
  const {handleRegisterUser} = useAuth();

  const handleRegisterClick = async(e) => {
    e.preventDefault();

    const { fullname, contact, email, password, isSeller } = userInput;

    const data = await handleRegisterUser({ fullname, contact, email, password, isSeller });

    const {success} = data;

    if(success) {
      setUserInput({fullname: "", contact: "", email: "", password: "", isSeller: false});
    }
  }

  return <main className="h-screen w-screen flex bg-zinc-900 justify-center items-center">
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