const DetailsCard = ({ product, images, activeImage, setActiveImage }) => {
    return <main className="flex lg:flex-row flex-col items-center justify-center px-5 lg:px-20">

        {/* Image panel */}
        <div className="flex-1 flex flex-col w-full border border-black/10 shadow-md shadow-black/10 rounded-md lg:gap-4 gap-1">
            {/* Main image */}
            <img
                src={activeImage ?? ''}
                alt="Product"
                className="object-contain h-100 w-full transition-opacity duration-300"
            />

            {/* Thumbnail strip — only renders when there are multiple images */}
            {images.length > 1 && (
                <div className="flex items-center lg:gap-3 gap-2 flex-wrap justify-center">
                    {images.map((img, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setActiveImage(img.url)}
                            className={`
                                                    lg:w-16 lg:h-16 w-12 h-12 rounded border-2 overflow-hidden shrink-0
                                                    transition-all duration-200 ease-linear cursor-pointer
                                                    ${activeImage === img.url
                                    ? 'border-stone-900 scale-105'
                                    : 'border-stone-300 hover:border-stone-500 opacity-70 hover:opacity-100'
                                }
                                                `}
                        >
                            <img
                                src={img.url}
                                alt={`Product view ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* Info panel */}
        <div className="lg:flex-1 flex flex-col justify-center lg:px-13 px-2 py-10 h-full w-full">
            <h1 className="text-3xl text-stone-900 mb-2">
                {product?.title}
            </h1>

            <div className="w-10 border-b-2 rounded-full border-stone-900 mb-4" />

            <p className="text-black mb-5 font-semibold">
                {product?.price.currency} {product?.price.amount}
            </p>

            <p className="lg:text-sm text-xs text-stone-600 leading-relaxed max-w-sm mb-6">
                {product?.description}
            </p>

            <hr className="border-zinc-400 rounded-full mb-5 border" />

            <div className="flex flex-col items-center gap-3 mt-5">
                <button
                    type="button"
                    className="lg:w-2/3 w-full bg-stone-900 rounded-xs cursor-pointer text-white lg:text-sm text-xs tracking-widest uppercase py-1.5 hover:bg-stone-700 duration-300 ease-in-out active:scale-90"
                >
                    Add to Cart
                </button>
                <button
                    type="button"
                    className="lg:w-2/3 w-full rounded-xs border cursor-pointer border-stone-900 text-stone-900 lg:text-sm text-xs tracking-widest uppercase py-1.5 flex items-center active:scale-90 justify-center gap-2 hover:bg-stone-300 duration-300 ease-in-out"
                >
                    Buy Now
                </button>
            </div>
        </div>
    </main>
}

export default DetailsCard