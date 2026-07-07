import { AttributeChip } from './VariantCard';

const DetailsCard = ({ product, images, activeImage, setActiveImage }) => {

    return <main className="flex flex-col items-start justify-center self-center">
        <p className="text-[clamp(34px,4vw,22px)] text-[#4a270d]">Details</p>

        <section className="flex lg:flex-row flex-col items-start justify-center px-5 lg:px-20 shadow-md shadow-black/10 rounded-md lg:w-[80vw] w-full bg-white">

            {/* Image panel */}
            <div className="lg:basis-1/2 w-full flex flex-col lg:gap-4 gap-1 justify-center">
                {/* Main image container */}
                <div className="w-full aspect-square max-h-100 flex items-center justify-center overflow-hidden">
                    <img
                        src={activeImage ?? ''}
                        alt="Product"
                        className="object-contain w-full h-full transition-opacity duration-300"
                    />
                </div>

                {/* Thumbnail strip — only renders when there are multiple images */}
                {images.length > 1 && (
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
            <div className="lg:basis-1/2 flex flex-col justify-center lg:px-13 px-2 py-10 h-full w-full">
                <h1 className="text-4xl text-stone-900 mb-2">
                    {product?.title}
                </h1>

                <p className="lg:text-sm text-xs text-stone-600 leading-relaxed max-w-sm mb-6">
                    {product?.description}
                </p>

                <p className="text-black mb-5 font-semibold">
                    {product?.price.amount} {product?.price.currency}
                </p>

                <hr className="border-zinc-400 rounded-full mb-5 border" />

                {/* Variants list */}
                {product?.variants && product.variants.length > 0 && (
                    <div className="w-full flex lg:flex-row flex-wrap gap-8 flex-col items-start justify-start mt-4">
                        {
                            product.variants.map((variant, index) => {
                                return (
                                <div className='flex flex-col gap-2 items-center justify-center' key={index}>
                                    {/* Image */}
                                    <div className='h-10 w-10 overflow-hidden rounded-full'>
                                        <img src={variant.images[0].url} className='h-full object-contain' alt="" />
                                    </div>

                                    {/* Price */}
                                    <p className='text-xs'>{variant?.price?.amount} {variant?.price?.currency}</p>

                                    {/* Attributes */}
                                    <div className='flex flex-col items-start justify-center gap-1'>
                                        {
                                            Object.keys(variant.attributes).map((attribute, index) => {
                                                return <AttributeChip 
                                                key={index}
                                                attribute={attribute}
                                                value={variant.attributes[attribute]}
                                                />
                                            })
                                        }
                                    </div>
                                </div>)
                            })
                        }
                    </div>
                )}

                <div className="flex flex-col items-center gap-3 mt-10">
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
        </section>
    </main>
}

export default DetailsCard;