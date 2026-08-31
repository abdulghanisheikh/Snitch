import { useNavigate } from "react-router";
import { formatAmount } from "../../../shared/utils/priceFormat.util";

const SellerProduct = ({ product, handleDeleteClick }) => {
	const navigate = useNavigate();

	return <main className="w-85 flex flex-col justify-between rounded-xl overflow-hidden shadow-2xl bg-white border border-black/20">
		<div className="relative">
			<img
				src={product.images.length === 0 ? '#' : product.images[0].url}
				alt="No Image"
				className="w-full h-75 object-cover object-center"
			/>
		</div>

		<div className="px-6 py-2 flex flex-col justify-between">

			<div className="flex flex-col justify-center">
				<h1 className="text-xl font-light text-gray-900 tracking-tight mb-1">
					{product.title}
				</h1>

				<p className="text-base text-gray-700 mb-3 font-semibold">{formatAmount(product.price.amount)}</p>

				<hr className="border-gray-300 mb-3" />

				<p className="text-xs text-gray-800 h-20 overflow-hidden leading-relaxed mb-5 overflow-y-auto" style={{
					scrollbarWidth: "none"
				}}>
					{product.description}
				</p>
			</div>

			<div className="flex items-center justify-between gap-2">
				<button
					onClick={handleDeleteClick}
					className="flex-1 py-1.5 px-2 text-xs cursor-pointer tracking-wide duration-300 ease-in-out rounded-sm bg-black text-white active:scale-90 hover:bg-black/90">
					Delete
				</button>

				<button
					onClick={() => navigate(`/seller/product/${product._id}`)}
					className="flex-1 py-1.5 px-2 text-xs cursor-pointer tracking-wide duration-300 ease-in-out rounded-sm bg-black text-white hover:bg-black/90 active:scale-90">
					Add Variant
				</button>
			</div>
		</div>
	</main>
}

export default SellerProduct;