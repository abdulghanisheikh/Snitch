const ProductCard = ({product, handleOnClick}) => {
    
    const getPrice = () => {
		const { currency, amount } = product.price;

		if (currency === 'INR') return '₹ ' + amount;
		if (currency === 'USD') return '$ ' + amount;
		if (currency === 'GBP') return '£ ' + amount;
		if (currency === 'JPY') return '¥ ' + amount;
		if (currency === 'ERU') return '€ ' + amount;
	}

    return <main 
    onClick={ handleOnClick }
    className="w-80 h-120 flex flex-col justify-between rounded-sm overflow-hidden shadow-2xl bg-white cursor-pointer hover:scale-105 duration-300 ease-in-out">
        <div className="relative">
            <img
                src={product.images.length === 0 ? '#' : product.images[0].url}
                alt="No Image"
                className="w-full h-72 object-cover"
            />
        </div>

        <div className="px-5 py-2">
            <h1 className="text-xl font-light text-gray-900 tracking-tight mb-1">
                {product.title}
            </h1>

            <p className="text-base text-gray-700 mb-3">{getPrice()}</p>

            <hr className="border-gray-300 mb-3" />

            <p className="lg:text-sm text-xs text-gray-800 leading-relaxed mb-5 overflow-y-auto" style={{
                scrollbarWidth: 'none'
            }}>
                {product.description}
            </p>
        </div>
    </main>
}

export default ProductCard;