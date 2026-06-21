const SellerProduct = ({product}) => {
	const getPrice = () => {
		const { currency, amount } = product.price;

		if (currency === 'INR') return '₹ ' + amount;
		if (currency === 'USD') return '$ ' + amount;
		if (currency === 'GBP') return '£ ' + amount;
		if (currency === 'JPY') return '¥ ' + amount;
		if (currency === 'ERU') return '€ ' + amount;
	}

	return <main className="w-80 h-140 flex flex-col justify-between rounded-sm overflow-hidden shadow-2xl bg-white">
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

				<p className="text-base text-gray-700 mb-3">{getPrice()}</p>

				<hr className="border-gray-300 mb-3" />

				<p className="lg:text-sm text-xs text-gray-800 leading-relaxed mb-5 overflow-y-auto" style={{
					scrollbarWidth: "none"
				}}>
					{product.description}
				</p>
			</div>

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

export default SellerProduct;