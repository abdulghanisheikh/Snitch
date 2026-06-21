import { useState, useRef } from "react";
import ProductCreateLoader from "./ProductCreateLoader";

const ProductForm = ({ handleSubmit, product, setProduct, loading }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const inputRef = useRef();

    const handleFiles = (files) => {
        const valid = Array.from(files).filter(f => f.type.startsWith('image/'));
        const newImgs = valid.map(f => ({
            file: f,
            url: URL.createObjectURL(f),
            id: crypto.randomUUID()
        }));

        setProduct(prev => ({ ...prev, images: [...prev.images, ...newImgs] }));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    }

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, price: { ...prev.price, [name]: value } }));
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-direction flex-col gap-3 w-full max-w-120 p-6 text-black sm:rounded-[20px]"
        >
            <div className="flex flex-col items-start justify-center mb-1">
                <h1 className="text-lg">Curate Your Product</h1>

                {/* Heading with Custom Pulse Dots */}
                <p className="text-[clamp(34px,4vw,22px)] text-[#4a270d] font-semibold tracking-tight relative flex items-center pl-7.5 mb-1">
                    <span className="absolute left-0 w-4 h-4 rounded-full bg-[#6F4E37]" />
                    <span className="absolute left-0 w-4 h-4 rounded-full bg-[#6F4E37] animate-[ping_1s_linear_infinite]" />
                    Add Product
                </p>
            </div>

            {/* Product Name */}
            <div className="flex gap-2 w-full">
                <label className="relative block flex-1">
                    <input
                        value={product.title}
                        type="text"
                        placeholder=" "
                        required
                        name="title"
                        onChange={handleChange}
                        className="peer w-full pt-5 pr-2 pb-1.5 pl-2.5 outline-none rounded-col rounded-[10px] text-[clamp(11px,1.6vw,13px)] border border-black"
                    />
                    <span className="absolute left-2.5 top-3.5 text-[clamp(10px,1.4vw,12px)] cursor-text transition-all duration-250 ease-out pointer-events-none peer-focus:text-black peer-focus:top-1 peer-focus:text-[clamp(9px,1.1vw,10px)] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:text-black peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[clamp(9px,1.1vw,10px)] peer-[:not(:placeholder-shown)]:font-semibold">
                        Product Name
                    </span>
                </label>
            </div>

            {/* Description */}
            <label className="relative block w-full">
                <textarea
                    placeholder=""
                    value={product.description}
                    required
                    name="description"
                    onChange={handleChange}
                    className="peer w-full pt-5 pr-2 pb-1.5 pl-2.5 outline-none border border-black rounded-[10px] text-[clamp(11px,1.6vw,13px)] min-h-18 resize-none"
                />
                <span className="absolute left-2.5 top-3.5 text-[clamp(10px,1.4vw,12px)] cursor-text transition-all duration-250 ease-out pointer-events-none peer-focus:text-black peer-focus:top-1 peer-focus:text-[clamp(9px,1.1vw,10px)] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:text-black peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[clamp(9px,1.1vw,10px)] peer-[:not(:placeholder-shown)]:font-semibold">
                    Description
                </span>
            </label>

            {/* Price Matrix */}
            <div className="flex items-center gap-2 w-full">
                <label className="relative block flex-1">
                    <input
                        value={product.price.amount}
                        type="text"
                        name="amount"
                        placeholder=''
                        required
                        onChange={handlePriceChange}
                        className="peer w-full pt-5 pr-2 pb-1.5 pl-2.5 outline-none border border-black rounded-[10px] text-[clamp(11px,1.6vw,13px)]"
                    />
                    <span className="absolute left-2.5 top-3.5 text-[clamp(10px,1.4vw,12px)] cursor-text transition-all duration-250 ease-out pointer-events-none peer-focus:text-black peer-focus:top-1 peer-focus:text-[clamp(9px,1.1vw,10px)] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:text-black peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[clamp(9px,1.1vw,10px)] peer-[:not(:placeholder-shown)]:font-semibold">
                        Price Amount
                    </span>
                </label>

                <div className="w-[20%]">
                    <select
                        name="currency"
                        onChange={handlePriceChange}
                        value={product.price.currency}
                        required
                        className="cursor-pointer w-full h-full py-3.5 px-3 outline-none border border-black/50 rounded-lg text-xs focus:border-black transition-colors appearance-none"
                    >
                        <option value="" disabled>Select Currency</option>
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                        <option value="ERU">ERU</option>
                    </select>
                </div>

            </div>

            {/* Image Upload Box */}
            <div>
                <span className="block text-[clamp(9px,1.1vw,11px)] font-semibold mb-1.5 mt-3 uppercase tracking-wider">
                    Product Images
                </span>
                <div
                    className={`border dashed rounded-[10px] py-5 px-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-300 ease-in-out ${isDragOver
                        ? "border-black"
                        : "hover:border-[#37261b] hover:border hover:bg-white/50"
                        }`}
                    onClick={() => inputRef.current.click()}
                    onDrop={handleDrop}
                    onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={e => { e.preventDefault(); setIsDragOver(false); }}
                >
                    <svg className="w-8 h-8 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="3" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                    </svg>
                    <p className="text-[clamp(11px,1.5vw,13px)] text-center">
                        Drop images here or <span className="font-semibold cursor-pointer">browse</span>
                    </p>
                    <p className="text-[clamp(9px,1.2vw,11px)]">PNG, JPG, WEBP — multiple allowed</p>
                    <p className="text-[clamp(9px,1.2vw,11px)]">Max Size 5 MB</p>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={e => handleFiles(e.target.files)}
                    />
                </div>

                {/* Previews Window */}
                {product.images.length > 0 && (
                    <>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(72px,1fr))] gap-2 mt-0.5">
                            {product.images.map(img => (
                                <div key={img.id} className="relative rounded-lg overflow-hidden aspect-square bg-[#2a2a2a]">
                                    <img src={img.url} alt={img.file.name} className="w-full h-full object-cover block" />
                                    <button
                                        type="button"
                                        className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/70 border-none text-white text-[11px] cursor-pointer flex items-center justify-center leading-none transition-colors duration-200 hover:bg-red-600"
                                        aria-label="Remove image"
                                    >✕</button>
                                </div>
                            ))}
                        </div>
                        <p className="text-[clamp(9px,1.2vw,11px)] text-white/35 text-right mt-0.5">
                            {product.images.length} image{product.images.length !== 1 ? "s" : ""} selected
                        </p>
                    </>
                )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="border-none outline-none p-3 text-[clamp(12px,1.8vw,14px)] bg-black text-white font-semibold tracking-wider active:scale-90 cursor-pointer duration-300 ease-in-out mt-1 items-center justify-center flex">
                {
                    loading === 'product' ? 
                    <ProductCreateLoader /> : 
                    "Publish Listing"
                }
            </button>
        </form>
    );
};

export default ProductForm;