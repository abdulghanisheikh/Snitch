import { useRef, useState } from "react";
import { useProduct } from "../hooks/useProduct";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const AttrChip = ({ attrKey, value, onRemove }) => (
    <div className="inline-flex items-center gap-1 bg-[#f5efe9] border border-black/20 rounded-full py-0.5 pl-3 pr-2">
        <span className="text-[10px] font-bold font-mono text-[#8b6350]">
            {attrKey}
        </span>
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

const ImageUploadZone = ({ imageInputRef, handleImageFileUpload }) => (
    <div>
        <div
            onClick={() => imageInputRef.current.click()}
            className="border border-dashed border-black/20 rounded-[10px] py-5 px-3 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-[#37261b] hover:bg-white/50 transition-all duration-300"
        >
            <svg
                className="w-8 h-8 opacity-50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            >
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
            </svg>

            <p className="text-[clamp(11px,1.5vw,13px)] text-center">
                Drop images here or <span className="font-semibold">browse</span>
            </p>

            <p className="text-[clamp(9px,1.2vw,11px)] text-black/50">
                PNG, JPG, WEBP — multiple allowed
            </p>
            <p className="text-[clamp(9px,1.2vw,11px)] text-black/50">
                Max Size 5 MB
            </p>

            <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageFileUpload}
                className="hidden"
            />
        </div>
    </div>
);

const AddVariantForm = ({ product, productId }) => {
    const { handleAddProductVariant } = useProduct();
    const loading = useSelector(state => state.product.loading);

    const [variant, setVariant] = useState({
        price: product?.price?.amount || 0,
        stock: 0,
        images: [],
        attributes: {},
    });

    const [currentKey, setCurrentKey] = useState("");
    const [currentValue, setCurrentValue] = useState("");

    const handleAddAttribute = () => {
        const key = currentKey.trim();
        const value = currentValue.trim();

        if (!key || !value) return;

        setVariant((prev) => ({
            ...prev,
            attributes: { ...prev.attributes, [key]: value },
        }));

        setCurrentKey("");
        setCurrentValue("");
    };

    const handleRemoveAttribute = (attribute) => {
        setVariant((prev) => {
            const attributes = { ...prev.attributes };

            delete attributes[attribute];
            return { ...prev, attributes };
        });
    };

    const imageInputRef = useRef();

    const handleImageFileUpload = (e) => {
        const files = Array.from(e.target.files);

        if (!files.length) return;

        const uploadedImages = files.map((file, index) => ({
            id: `${file.name}-${index}`,
            name: file.name,
            url: URL.createObjectURL(file),
            file: file,
        }));

        setVariant({ ...variant, images: [...variant.images, ...uploadedImages] });
        e.target.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await handleAddProductVariant({
            productId,
            stock: variant.stock,
            images: variant.images,
            attributes: variant.attributes,
            priceAmount: variant.price,
        });

        const { success } = data;
        if (success) {
            setVariant({
                price: product?.price?.amount || 0,
                stock: 0,
                images: [],
                attributes: {},
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="border border-black/20 rounded-sm overflow-hidden bg-white h-full flex flex-col shadow-sm "
        >
            <div className="p-4 flex flex-col gap-4 flex-1 justify-between">
                <div className="flex flex-col gap-4">
                    <p className="tracking-wide text-lg">
                        <span className="italic text-sm">Product - </span>
                        {product?.title}
                    </p>

                    {/* Price Box */}
                    <div>
                        <p className="text-[9px] font-bold tracking-widest text-black/40 mb-1.5 uppercase">
                            Price
                        </p>
                        <div className="flex gap-2">
                            <label className="relative block flex-1">
                                <input
                                    value={variant.price}
                                    onChange={(e) =>
                                        setVariant({ ...variant, price: e.target.value })
                                    }
                                    type="number"
                                    placeholder=""
                                    className="peer w-full pt-5 pr-2 pb-1.5 pl-2.5 outline-none rounded-[10px] text-[clamp(11px,1.6vw,13px)] border border-black/20 focus:border-black transition-colors"
                                />
                                <span className="absolute left-2.5 top-3.5 text-[clamp(10px,1.4vw,12px)] cursor-text transition-all duration-250 ease-out pointer-events-none peer-focus:top-1 peer-focus:text-[10px] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-semibold">
                                    Amount
                                </span>
                            </label>

                            {/* Disabled currency choice to make it unchangeable */}
                            <p
                                disabled
                                className="w-[25%] py-3.5 px-2 outline-none border border-black/20 rounded-lg text-xs cursor-not-allowed bg-black/5 opacity-60 appearance-none"
                            >
                                {product?.price?.currency}
                            </p>
                        </div>
                    </div>

                    {/* Stock Box */}
                    <div>
                        <p className="text-[9px] font-bold tracking-widest text-black/40 mb-2 uppercase">
                            Initial Stock
                        </p>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    if (variant.stock === 0) return;
                                    setVariant({ ...variant, stock: variant.stock - 1 });
                                }}
                                className="w-8 h-8 cursor-pointer rounded-lg border border-black/20 text-base flex items-center justify-center hover:border-black/50 transition-colors"
                            >
                                -
                            </button>

                            <span className="w-7 text-center font-bold text-sm">
                                {variant.stock}
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    setVariant({ ...variant, stock: variant.stock + 1 })
                                }
                                className="w-8 h-8 cursor-pointer rounded-lg border border-black/20 text-base flex items-center justify-center hover:border-black/50 transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Variant Images Upload Box */}
                    <div>
                        <p className="text-[9px] font-bold tracking-widest text-black/40 mb-1.5 uppercase">
                            Variant Images
                        </p>
                        <ImageUploadZone
                            imageInputRef={imageInputRef}
                            handleImageFileUpload={handleImageFileUpload}
                        />

                        {variant.images.length > 0 && (
                            <div className="mt-4">
                                <p className="text-[9px] uppercase tracking-widest text-black/40 mb-2">
                                    Selected Images
                                </p>

                                <div className="flex items-center gap-1">
                                    {variant.images.map((preview) => (
                                        <div
                                            key={preview.id}
                                            className="relative rounded-lg border border-black/10 overflow-hidden bg-[#faf8f5] h-fit w-fit"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setVariant({
                                                        ...variant,
                                                        images: variant.images.filter(
                                                            (img) => img.id !== preview.id,
                                                        ),
                                                    });
                                                }}
                                                className="absolute top-1 right-1 z-10 w-6 h-6 rounded-full bg-white/90 border border-black/10 text-xs flex items-center justify-center text-red-600 hover:bg-red-50 cursor-pointer"
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
                        <p className="text-[9px] font-bold tracking-widest text-black/40 mb-1.5 uppercase">
                            Attributes
                        </p>

                        {/* Interactive fields to add to the dynamic stack */}
                        <div className="flex gap-2 mb-3">
                            <input
                                onChange={(e) => setCurrentKey(e.target.value)}
                                value={currentKey}
                                placeholder="Key (e.g. color)"
                                className="flex-1 px-2.5 py-2 border rounded-[10px] border-black/20 focus:border-black text-xs outline-none font-mono transition-colors"
                            />
                            <input
                                value={currentValue}
                                onChange={(e) => setCurrentValue(e.target.value)}
                                placeholder="Value (e.g. white)"
                                className="flex-1 px-2.5 py-2 border rounded-[10px] border-black/20 focus:border-black text-xs outline-none transition-colors"
                            />
                            <button
                                onClick={handleAddAttribute}
                                type="button"
                                className="px-3 py-2 rounded-[10px] border border-black/20 text-xs font-bold text-[#6F4E37] bg-[#f5efe9] hover:bg-[#ecddd3] transition-colors cursor-pointer"
                            >
                                + Add
                            </button>
                        </div>

                        {/* Staged collection view wrapper */}
                        {Object.keys(variant.attributes).length > 0 && (
                            <div className="flex flex-wrap gap-1.5 p-2 bg-[#faf8f5] border border-black/20 rounded-[10px]">
                                {Object.keys(variant.attributes).map((attribute, index) => (
                                    <AttrChip
                                        key={index}
                                        attrKey={attribute}
                                        value={variant.attributes[attribute]}
                                        onRemove={() => handleRemoveAttribute(attribute)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="border-none outline-none px-3 py-2.5 text-[clamp(12px,1.8vw,14px)] bg-black text-white font-semibold tracking-wider active:scale-90 cursor-pointer duration-300 ease-in-out mt-1 items-center justify-center flex"
                >
                    {
                        loading === 'variant' ?
                        <Loader /> :
                        'Add Variant'
                    }
                </button>
            </div>
        </form>
    );
};

export default AddVariantForm;