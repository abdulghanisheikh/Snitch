import { AttributeChip } from './VariantCard';

const DetailsCard = ({ product, baseProduct, selectedVariant, handleAddToCart, setSelectedVariant, images, activeImage, setActiveImage }) => {

    const displayTitle = selectedVariant
        ? baseProduct?.title
        : product?.title;

    const displayPrice = product?.price;

    return <main className="flex lg:flex-row flex-col items-start px-5 lg:px-20 lg:w-[80vw] w-full">

            {/* Image panel */}
            <div className="lg:basis-1/2 w-full flex flex-col lg:gap-4 gap-1 justify-center">
                {/* Main image container */}
                <div className="w-full aspect-square max-h-100 rounded-xl flex items-center justify-center overflow-hidden">
                    <img
                        src={activeImage ?? ''}
                        alt="Product"
                        className="object-cover w-full h-full transition-opacity duration-300"
                    />
                </div>

                {/* Thumbnail strip — only renders when there are multiple images */}
                {images?.length > 1 && (
                    <div className="flex items-center lg:gap-3 gap-2 flex-wrap justify-center mt-2">
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
            <div className="lg:basis-1/2 flex flex-col justify-center lg:px-13 px-2 lg:py-0 py-5 h-full w-full">
                <h1 className="text-4xl text-stone-900s">
                    {displayTitle}
                </h1>

                <p className="lg:text-sm text-xs mt-3 text-stone-600 leading-relaxed max-w-sm mb-6">
                    {product?.description}
                </p>

                <p className="text-black mb-5 font-semibold">
                    {displayPrice?.amount} {displayPrice?.currency}
                </p>

                <hr className="border-zinc-400 rounded-full mb-5 border" />

                {selectedVariant && (
                    <button
                        type="button"
                        onClick={() => setSelectedVariant(null)}
                        className="rounded-sm border w-fit border-black/10 px-3 py-1 text-xs font-semibold uppercase hover:bg-white duration-300 ease-in-out cursor-pointer"
                    >
                        Clear selection
                    </button>
                )}

                {/* Variants list */}
                {product?.variants && product.variants.length > 0 && (
                    <div className="w-full flex lg:flex-row flex-wrap gap-4 mt-4">
                        {product.variants.map((variant, index) => {
                            const isSelected = selectedVariant === variant;
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setSelectedVariant(isSelected ? null : variant)}
                                    className={`flex flex-col gap-2 items-center justify-center rounded-xl border p-3 text-left transition-all duration-200 ease-linear ${isSelected ? 'border-stone-900 bg-stone-100' : 'border-gray-200 bg-white hover:border-stone-400'}`}
                                >
                                    <div className='h-12 w-12 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center'>
                                        <img src={variant.images[0]?.url} className='h-full w-full object-contain' alt="" />
                                    </div>

                                    <p className='text-xs text-stone-900 font-semibold'>
                                        {variant?.price?.amount} {variant?.price?.currency}
                                    </p>

                                    <div className='flex flex-col items-start justify-center gap-1'>
                                        {Object.keys(variant.attributes || {}).map((attribute, attrIndex) => (
                                            <AttributeChip 
                                                key={attrIndex}
                                                attribute={attribute}
                                                value={variant.attributes[attribute]}
                                            />
                                        ))}
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                )}

                <div className="flex flex-col items-center gap-3 mt-10">
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        className="lg:w-2/3 w-full bg-stone-900 rounded-sm cursor-pointer text-white lg:text-sm text-xs tracking-widest uppercase py-1.5 hover:bg-stone-700 duration-300 ease-in-out active:scale-90"
                    >
                        Add to Cart
                    </button>
                    <button
                        type="button"
                        className="lg:w-2/3 w-full rounded-sm border cursor-pointer border-black/30 text-stone-900 lg:text-sm text-xs tracking-widest uppercase py-1.5 flex items-center active:scale-90 justify-center gap-2 hover:bg-stone-300 duration-300 ease-in-out"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </main>
}

export default DetailsCard;