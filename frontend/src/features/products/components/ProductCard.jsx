const ProductCard = ({product, handleOnClick}) => {
    return <main
    onClick={ handleOnClick }
    className="w-80 h-120 flex flex-col justify-between gap-3 rounded-md overflow-hidden shadow-md bg-white cursor-pointer hover:scale-101 duration-300 ease-in-out border border-black/20">

        <div className="relative flex-1 w-full">
            <img
                src={product.images.length === 0 ? '#' : product.images[0].url}
                alt="No Image"
                className="w-full h-72 object-cover"
            />
        </div>

        <div className="flex flex-col flex-1 w-full justify-evenly">
            <h1 className="text-xl font-light text-gray-900 tracking-tight px-5">
                {product.title}
            </h1>

            <p className="text-base text-gray-700 font-semibold px-5">{product.price.amount} {product.price.currency}</p>

            <hr className="w-full border-1/2 border-black/30"></hr>

            <p className="text-xs px-5 h-20 text-black/80 leading-relaxed overflow-y-auto"
            style={{
                scrollbarWidth: 'none'
            }}
            >
                {product.description}
            </p>
        </div>
    </main>
}

export default ProductCard;