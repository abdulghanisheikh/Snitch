const ProductCard = ({product}) => {
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
				src={product.images.length === 0 ? '#' : product.images[0].url}
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

			<div className="flex items-center justify-between gap-2">
				<button
				className="flex-1 py-2 text-xs cursor-pointer tracking-widest uppercase transition-all duration-300 rounded-xs bg-black text-white">
					Remove
				</button>

				<button className="flex-1 py-2 text-xs cursor-pointer tracking-widest uppercase transition-all duration-300 rounded-xs bg-black text-white">
					Edit
				</button>
			</div>
		</div>
	</main>
}

export default ProductCard;