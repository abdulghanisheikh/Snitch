import ProductForm from "../components/ProductForm";
import { ToastContainer } from "react-toastify";

const CreateProductPage = () => {

	return (
		<div className="min-h-screen w-screen flex bg-zinc-900 justify-center items-center">
			<ProductForm />
			<ToastContainer position="top-right" />
		</div>
	)
}

export default CreateProductPage;