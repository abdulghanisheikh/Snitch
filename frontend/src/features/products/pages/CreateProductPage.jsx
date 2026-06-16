import ProductForm from "../components/ProductForm";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { useProduct } from "../hooks/useProduct.js";
import { useSelector } from "react-redux";
import Navbar from "../../../shared/components/Navbar.jsx";

const CreateProductPage = () => {
	const [product, setProduct] = useState({
		title: "",
		description: "",
		price: {
			amount: "",
			currency: "INR"
		},
		images: []
	});

	const loading = useSelector(state => state.product.loading);

	const { handleCreateProduct } = useProduct();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();

		formData.append("title", product.title);
		formData.append("description", product.description);
		formData.append("priceAmount", product.price.amount);
		formData.append("priceCurrency", product.price.currency);

		for(let i = 0; i < product.images.length; i++) {
			formData.append("photo", product.images[i].file);
		}

		const data = await handleCreateProduct(formData);

		const { success } = data;

		if(success) {
			setProduct({
				title: "",
				description: "",
				price: {
					amount: "",
					currency: "INR"
				},
				images: []
			});
		}
	}

	return (
		<main className="min-h-screen w-screen flex flex-col items-center">
			<Navbar />
			
			<ProductForm
				handleSubmit={handleSubmit}
				setProduct={setProduct}
				product={product}
				loading={loading}
			/>
			<ToastContainer position="top-right" />
		</main>
	)
}

export default CreateProductPage;