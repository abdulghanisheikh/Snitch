import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Navbar from "../../../shared/components/Navbar";
import { useProduct } from "../hooks/useProduct";
import { ToastContainer } from "react-toastify";
import { useRef } from "react";

const AttrChip = ({ attrKey, value, onRemove }) => (
    <div className="inline-flex items-center gap-1 bg-[#f5efe9] border border-black/20 rounded-full py-0.5 pl-3 pr-2">
        <span className="text-[10px] font-bold font-mono text-[#8b6350]">{attrKey}</span>
        <span className="text-[10px] text-[#b5a090]">·</span>
        <span className="text-[11px] text-[#1a1108]">{value}</span>
        <button
            type="button"
            onClick={onRemove}
            className="text-[#b5a090] text-xs ml-0.5 leading-none hover:text-red-500 transition-colors cursor-pointer"
        >
            ✕
        </button>
    </div>
);

const ImageUploadZone = ({ inputRef, handleImageFileUpload }) => (
    <div>
        <div
            onClick={() => inputRef.current?.click()}
            className="border border-dashed border-black/20 rounded-[10px] py-5 px-3 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-[#37261b] hover:bg-white/50 transition-all duration-300"
        >
            <svg className="w-8 h-8 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
            </svg>

            <p className="text-[clamp(11px,1.5vw,13px)] text-center">
                Drop images here or <span className="font-semibold">browse</span>
            </p>

            <p className="text-[clamp(9px,1.2vw,11px)] text-black/50">PNG, JPG, WEBP — multiple allowed</p>
            <p className="text-[clamp(9px,1.2vw,11px)] text-black/50">Max Size 5 MB</p>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageFileUpload}
                className="hidden"
            />
        </div>
    </div>
);

const AddVariantFormCard = ({ product }) => {
    const [variant, setVariant] = useState({
        images: [],
        price: product?.price?.amount,
        stock: 0,
        attributes: []
    });

    const [imagePreviews, setImagePreviews] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [attrKey, setAttrKey] = useState('');
    const [attrValue, setAttrValue] = useState('');

    const imageInputReference = useRef(null);

    const handleAddAttribute = () => {
        if (!attrKey.trim() || !attrValue.trim()) return;

        // Prevent adding duplicate keys for a clean record structure
        if (attributes.some(attr => attr.key.toLowerCase() === attrKey.trim().toLowerCase())) {
            return;
        }

        setAttributes([...attributes, { key: attrKey.trim(), value: attrValue.trim() }]);
        setAttrKey("");
        setAttrValue("");
    };

    const handleRemoveAttribute = (indexToRemove) => {
        setAttributes(attributes.filter((_, index) => index !== indexToRemove));
    };

    const handlePriceChange = (e) => {
        setVariant({...variant, price: e.target.value});
    }

    const handleImageFileUpload = () => {
        const imageField = imageInputReference.current;
        const files = imageField?.files ? Array.from(imageField.files) : [];

        // Merge new files with existing ones and dedupe by name+size
        const existing = variant.images || [];
        const combined = [...existing, ...files];
        const seen = new Set();
        const deduped = [];
        for (const f of combined) {
            const key = `${f.name}_${f.size}`;
            if (!seen.has(key)) {
                seen.add(key);
                deduped.push(f);
            }
        }

        setVariant({ ...variant, images: deduped });

        // clear input so same file can be selected again if needed
        if (imageField) imageField.value = "";
    }

    const handleRemoveImage = (index) => {
        const newImages = (variant.images || []).filter((_, i) => i !== index);
        setVariant({ ...variant, images: newImages });
    }

    useEffect(() => {
        if (!variant.images || variant.images.length === 0) {
            setImagePreviews([]);
            return;
        }

        const previews = variant.images.map((file, index) => ({
            url: URL.createObjectURL(file),
            name: file.name,
            id: `${file.name}-${index}`
        }));

        setImagePreviews(previews);

        return () => {
            previews.forEach((preview) => URL.revokeObjectURL(preview.url));
        };
    }, [variant.images]);

    return (
        <div className="border border-black/20 rounded-sm overflow-hidden bg-white h-full flex flex-col shadow-sm ">
            <div className="p-4 flex flex-col gap-4 flex-1 justify-between">
                <div className="flex flex-col gap-4">
                    <p>{product?.title}</p>

                    {/* Price Box */}
                    <div>
                        <p className="text-[9px] font-bold tracking-widest text-black/40 mb-1.5 uppercase">Price</p>
                        <div className="flex gap-2">
                            <label className="relative block flex-1">
                                <input 
                                value={variant.price}
                                onChange={(e) => handlePriceChange(e)}
                                type="number"
                                placeholder=''
                                className="peer w-full pt-5 pr-2 pb-1.5 pl-2.5 outline-none rounded-[10px] text-[clamp(11px,1.6vw,13px)] border border-black/20 focus:border-black transition-colors" />
                                <span className="absolute left-2.5 top-3.5 text-[clamp(10px,1.4vw,12px)] cursor-text transition-all duration-250 ease-out pointer-events-none peer-focus:top-1 peer-focus:text-[10px] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-semibold">
                                    Amount
                                </span>
                            </label>

                            {/* Disabled currency choice to make it unchangeable */}
                            <p disabled className="w-[25%] py-3.5 px-2 outline-none border border-black/20 rounded-lg text-xs cursor-not-allowed bg-black/5 opacity-60 appearance-none">
                                {product?.price?.currency}
                            </p>

                        </div>
                    </div>

                    {/* Stock Box */}
                    <div>
                        <p className="text-[9px] font-bold tracking-widest text-black/40 mb-2 uppercase">Initial Stock</p>

                        <div className="flex items-center gap-3">
                            <button 
                            onClick={() => {
                                if(variant.stock === 0) return;
                                setVariant({...variant, stock: variant.stock - 1});
                            }}
                            type="button"
                            className="w-8 h-8 cursor-pointer rounded-lg border border-black/20 text-base flex items-center justify-center hover:border-black/50 transition-colors">
                                -
                            </button>

                            <span className="w-7 text-center font-bold text-sm">{variant.stock}</span>
                            
                            <button
                            type="button"
                            onClick={() => setVariant({...variant, stock: variant.stock + 1})}
                            className="w-8 h-8 cursor-pointer rounded-lg border border-black/20 text-base flex items-center justify-center hover:border-black/50 transition-colors">
                                +
                            </button>
                        </div>
                    </div>

                    {/* Variant Images Upload Box */}
                    <div>
                        <p className="text-[9px] font-bold tracking-widest text-black/40 mb-1.5 uppercase">Variant Images</p>
                        <ImageUploadZone inputRef={imageInputReference} handleImageFileUpload={handleImageFileUpload} />

                        {imagePreviews.length > 0 && (
                            <div className="mt-4">
                                <p className="text-[9px] uppercase tracking-widest text-black/40 mb-2">Selected Images</p>

                                <div className="grid grid-cols-3 gap-2">
                                    {imagePreviews.map((preview, idx) => (
                                        <div key={preview.id} className="relative rounded-lg border border-black/10 overflow-hidden bg-[#faf8f5] h-fit w-fit">
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(idx)}
                                                className="absolute top-1 right-1 z-10 w-6 h-6 rounded-full bg-white/90 border border-black/10 text-xs flex items-center justify-center text-red-600 hover:bg-red-50"
                                                aria-label={`Remove ${preview.name}`}
                                            >
                                                ✕
                                            </button>
                                            <img
                                                src={preview.url}
                                                alt={`${preview.name} preview`}
                                                className="h-20 w-20 object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Variant Dynamic Attributes Setup */}
                    <div>
                        <p className="text-[9px] font-bold tracking-widest text-black/40 mb-1.5 uppercase">Attributes</p>

                        {/* Interactive fields to add to the dynamic stack */}
                        <div className="flex gap-2 mb-3">
                            <input
                                value={attrKey}
                                onChange={(e) => setAttrKey(e.target.value)}
                                placeholder="Key (e.g. color)"
                                className="flex-1 px-2.5 py-2 border rounded-[10px] border-black/20 focus:border-black text-xs outline-none font-mono transition-colors"
                            />
                            <input
                                value={attrValue}
                                onChange={(e) => setAttrValue(e.target.value)}
                                placeholder="Value (e.g. white)"
                                className="flex-1 px-2.5 py-2 border rounded-[10px] border-black/20 focus:border-black text-xs outline-none transition-colors"
                            />
                            <button
                                type="button"
                                onClick={handleAddAttribute}
                                className="px-3 py-2 rounded-[10px] border border-black/20 text-xs font-bold text-[#6F4E37] bg-[#f5efe9] hover:bg-[#ecddd3] transition-colors cursor-pointer"
                            >
                                + Add
                            </button>
                        </div>

                        {/* Staged collection view wrapper */}
                        {attributes.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 p-2 bg-[#faf8f5] border border-black/20 rounded-[10px]">
                                {attributes.map((attr, idx) => (
                                    <AttrChip
                                        key={idx}
                                        attrKey={attr.key}
                                        value={attr.value}
                                        onRemove={() => handleRemoveAttribute(idx)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <button type="button" className="w-full mt-4 py-2.5 bg-black hover:bg-black/90 duration-300 ease-in-out text-white text-sm font-bold rounded-sm transition-colors cursor-pointer">
                    Add Variant
                </button>
            </div>
        </div>
    );
};

// Main Page
const AddProductVariant = () => {
    const [product, setProduct] = useState(null);
    const { handleGetProductDetails } = useProduct();
    const { productId } = useParams();

    useEffect(() => {
        const fetchProductDetails = async() => {
            const productDetails = await handleGetProductDetails(productId);
            setProduct(productDetails);
        }

        fetchProductDetails();
    }, [productId]);

    return (
        <main className="flex flex-col items-center min-h-screen w-screen bg-[#111111]/5">
            {/* Mock Header navbar space */}
            <Navbar pageName="Add Variant" backTo='/account' />

            <form className="flex flex-col gap-2 px-6 py-2.5 mx-auto justify-center items-start text-black">

                {/* Header */}
                <div className="flex flex-col justify-center items-start">
                    <h1 className="text-lg">Add a variant to this product</h1>
                    <p className="text-[clamp(34px,4vw,22px)] text-[#4a270d] font-semibold relative flex items-center pl-6 tracking-wide">
                        <span className="absolute left-0 w-3 h-3 rounded-full bg-[#6F4E37]" />
                        <span className="absolute left-0 w-3 h-3 rounded-full bg-[#6F4E37] animate-[ping_1s_linear_infinite]" />
                        Variant & Inventory
                    </p>
                </div>

                <AddVariantFormCard product={product} />
            </form>

            <ToastContainer position='top-right' />
        </main>
    );
};

export default AddProductVariant;