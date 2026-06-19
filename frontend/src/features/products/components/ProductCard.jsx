import { useState } from "react";

const bagImageUrl =
	"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80";

const ProductCard = ({product}) => {
	const [added, setAdded] = useState(false);

	const handleAdd = () => {
		setAdded(true);
		setTimeout(() => setAdded(false), 2000);
	};

	const getPrice = () => {
		const { currency, amount } = product.price;

		if (currency === 'INR') return '₹ ' + amount;
		if (currency === 'USD') return '$ ' + amount;
		if (currency === 'GBP') return '£ ' + amount;
		if (currency === 'JPY') return '¥ ' + amount;
		if (currency === 'ERU') return '€ ' + amount;
	}

	return <main className="w-80 rounded-sm overflow-hidden shadow-2xl bg-white">
		<div className="relative">
			<img
				src={product.images.length === 0 ? '' : product.images[0].url}
				alt="No Image"
				className="w-full h-72 object-cover"
			/>
		</div>

		<div className="px-5 pt-5 pb-6">
			<h1 className="text-xl font-light text-gray-900 tracking-tight mb-1">
				{product.title}
			</h1>

			<p className="text-base text-gray-700 mb-3">{getPrice()}</p>

			<hr className="border-gray-300 mb-3" />

			<p className="lg:text-sm text-xs text-gray-800 leading-relaxed mb-5">
				{product.description}
			</p>

			<button
				onClick={handleAdd}
				className={`w-full py-3 text-sm cursor-pointer font-semibold tracking-widest uppercase transition-all duration-300 rounded-xs ${added
						? "bg-green-700 text-white"
						: "bg-black text-white hover:bg-neutral-800 active:scale-95"
					}`}
			>
				{added ? "Added to Bag ✓" : "Add to Bag"}
			</button>
		</div>
	</main>
}

export default ProductCard;