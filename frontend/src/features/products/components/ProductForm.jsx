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
        <div className="w-screen min-h-screen flex items-center justify-center bg-[#111111] p-5">
            <form
                onSubmit={handleSubmit}
                className="flex flex-direction flex-col gap-3 w-full max-w-120 p-6 bg-[#1a1a1a] text-white border border-[#333333] sm:rounded-[20px]"
            >
                {/* Heading with Custom Pulse Dots */}
                <p className="text-[clamp(30px,4vw,22px)] font-semibold tracking-tight relative flex items-center pl-7.5 text-[#00bfff] mb-1">
                    <span className="absolute left-0 w-4 h-4 rounded-full bg-[#00bfff]" />
                    <span className="absolute left-0 w-4 h-4 rounded-full bg-[#00bfff] animate-[ping_1s_linear_infinite]" />
                    Add Product
                </p>

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
                            className="peer bg-[#2a2a2a] text-white w-full pt-5 pr-2 pb-1.5 pl-2.5 outline-none border border-[rgba(150,150,150,0.3)] rounded-col rounded-[10px] text-[clamp(11px,1.6vw,13px)] font-sans"
                        />
                        <span className="absolute left-2.5 top-3.5 text-[clamp(10px,1.4vw,12px)] text-white/45 cursor-text transition-all duration-250 ease-out pointer-events-none peer-focus:text-[#00bfff] peer-focus:top-1 peer-focus:text-[clamp(9px,1.1vw,10px)] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:text-[#00bfff] peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[clamp(9px,1.1vw,10px)] peer-[:not(:placeholder-shown)]:font-semibold">
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
                        className="peer bg-[#2a2a2a] text-white w-full pt-5 pr-2 pb-1.5 pl-2.5 outline-none border border-[rgba(150,150,150,0.3)] rounded-[10px] text-[clamp(11px,1.6vw,13px)] font-sans min-h-18 resize-none"
                    />
                    <span className="absolute left-2.5 top-3.5 text-[clamp(10px,1.4vw,12px)] text-white/45 cursor-text transition-all duration-250 ease-out pointer-events-none peer-focus:text-[#00bfff] peer-focus:top-1 peer-focus:text-[clamp(9px,1.1vw,10px)] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:text-[#00bfff] peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[clamp(9px,1.1vw,10px)] peer-[:not(:placeholder-shown)]:font-semibold">
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
                            className="peer bg-[#2a2a2a] text-white w-full pt-5 pr-2 pb-1.5 pl-2.5 outline-none border border-[rgba(150,150,150,0.3)] rounded-[10px] text-[clamp(11px,1.6vw,13px)] font-sans"
                        />
                        <span className="absolute left-2.5 top-3.5 text-[clamp(10px,1.4vw,12px)] text-white/45 cursor-text transition-all duration-250 ease-out pointer-events-none peer-focus:text-[#00bfff] peer-focus:top-1 peer-focus:text-[clamp(9px,1.1vw,10px)] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:text-[#00bfff] peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[clamp(9px,1.1vw,10px)] peer-[:not(:placeholder-shown)]:font-semibold">
                            Price Amount
                        </span>
                    </label>

                    <div className="w-[20%]">
                        <select
                            name="currency"
                            onChange={handlePriceChange}
                            value={product.price.currency}
                            className="cursor-pointer w-full h-full py-3.5 bg-[#2a2a2a] text-white px-3 outline-none border border-white/20 rounded-lg text-xs focus:border-[#00bfff] transition-colors appearance-none"
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
                    <span className="block text-[clamp(9px,1.1vw,11px)] font-semibold text-[#00bfff] mb-1.5 mt-3 uppercase tracking-wider">
                        Product Images
                    </span>
                    <div
                        className={`border-[1.5px] dashed rounded-[10px] py-5 px-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-200 bg-[#222222] ${isDragOver
                            ? "border-[#00bfff] bg-[#00bfff]/5"
                            : "border-[#00bfff]/35 hover:border-[#00bfff] hover:bg-[#00bfff]/5"
                            }`}
                        onClick={() => inputRef.current.click()}
                        onDrop={handleDrop}
                        onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
                        onDragLeave={e => { e.preventDefault(); setIsDragOver(false); }}
                    >
                        <svg className="w-8 h-8 opacity-50 text-[#00bfff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="3" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                        </svg>
                        <p className="text-[clamp(11px,1.5vw,13px)] text-white/50 text-center">
                            Drop images here or <span className="text-[#00bfff] font-semibold cursor-pointer">browse</span>
                        </p>
                        <p className="text-[clamp(9px,1.2vw,11px)] text-white/30">PNG, JPG, WEBP — multiple allowed</p>
                        <p className="text-[clamp(9px,1.2vw,11px)] text-white/30">Max Size 5 MB</p>
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
                <button type="submit" className="border-none outline-none p-3 rounded-[10px] text-white text-[clamp(12px,1.8vw,14px)] bg-blue-500 font-semibold tracking-wide cursor-pointer transition-colors duration-250 mt-1 hover:bg-blue-400">
                    {loading === 'product' ? <div className="flex items-center justify-center gap-1">
                        <p>Adding Product</p>
                        <ProductCreateLoader />
                    </div> : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default ProductForm;