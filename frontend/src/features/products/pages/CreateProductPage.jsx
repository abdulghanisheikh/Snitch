import ProductForm from "../components/ProductForm";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { useProduct } from "../hooks/useProduct.js";
import { useSelector } from "react-redux";

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
			const imageFile = product.images[i].file;
			formData.append("photo", imageFile);
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
		<div className="min-h-screen w-screen flex bg-zinc-900 justify-center items-center">
			<ProductForm
				handleSubmit={handleSubmit}
				setProduct={setProduct}
				product={product}
				loading={loading}
			/>
			<ToastContainer position="top-right" />
		</div>
	)
}

export default CreateProductPage;