import Navbar from "../../../shared/components/Navbar";
import { useParams } from "react-router";
import { useProduct } from "../hooks/useProduct";
import { useEffect, useRef, useState } from "react";

// ── Attribute Chip ────────────────────────────────────────────────────────────
const AttrChip = ({ attrKey, value, onRemove }) => (
    <div className="inline-flex items-center gap-1 bg-[#f5efe9] border border-[#e5ddd6] rounded-full py-0.5 pl-3 pr-2">
        <span className="text-[10px] font-bold font-mono text-[#8b6350]">{attrKey}</span>
        <span className="text-[10px] text-[#b5a090]">·</span>
        <span className="text-[11px] text-[#1a1108]">{value}</span>
        {onRemove && (
            <button type="button" onClick={onRemove}
                className="text-[#b5a090] text-xs ml-0.5 leading-none hover:text-red-500 transition-colors">
                ✕
            </button>
        )}
    </div>
);

// ── Stock Badge ───────────────────────────────────────────────────────────────
const StockBadge = ({ stock }) => {
    if (stock === 0) return <span className="text-[10px] font-bold tracking-wide px-2.5 py-0.5 rounded-full bg-red-50 text-red-600">Out of stock</span>;
    if (stock <= 2)  return <span className="text-[10px] font-bold tracking-wide px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700">Low · {stock}</span>;
    return <span className="text-[10px] font-bold tracking-wide px-2.5 py-0.5 rounded-full bg-green-50 text-green-700">In stock · {stock}</span>;
};

// ── Inline Stock Editor ───────────────────────────────────────────────────────
const InlineStockEditor = ({ stock, onChange }) => {
    const [editing, setEditing] = useState(false);
    const [val, setVal] = useState(String(stock));

    const commit = () => {
        const n = parseInt(val, 10);
        if (!isNaN(n) && n >= 0) onChange(n);
        setEditing(false);
    };

    if (editing) return (
        <div className="flex items-center gap-2">
            <input
                autoFocus type="number" min={0} value={val}
                onChange={e => setVal(e.target.value)}
                onBlur={commit}
                onKeyDown={e => { if (e.key === "Enter") commit(); if (e.key === "Escape") setEditing(false); }}
                className="w-16 px-2 py-1 border border-[#6F4E37] rounded-md text-xs outline-none"
            />
            <button type="button" onClick={commit}
                className="text-[11px] font-bold px-3 py-1 bg-[#6F4E37] text-white rounded-md">
                Set
            </button>
        </div>
    );

    return (
        <button type="button" onClick={() => { setVal(String(stock)); setEditing(true); }}
            className="flex items-center gap-2 group">
            <StockBadge stock={stock} />
            <span className="text-[10px] text-[#b5a090] group-hover:text-[#6F4E37] transition-colors">✎ edit</span>
        </button>
    );
};

// ── Image Upload Zone ─────────────────────────────────────────────────────────
const ImageUploadZone = ({ images, onAdd, onRemove }) => {
    const inputRef = useRef();
    const [dragging, setDragging] = useState(false);

    const handleFiles = (files) => {
        Array.from(files).forEach(file => {
            if (!file.type.startsWith("image/")) return;
            const reader = new FileReader();
            reader.onload = e => onAdd({ url: e.target.result });
            reader.readAsDataURL(file);
        });
    };

    return (
        <div>
            <div
                onClick={() => inputRef.current.click()}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
                className={`border border-dashed rounded-[10px] py-5 px-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-300 ease-in-out ${
                    dragging ? "border-[#6F4E37] bg-[#f5efe9]" : "hover:border-[#37261b] hover:bg-white/50"
                }`}
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
                <input ref={inputRef} type="file" accept="image/*" multiple className="hidden"
                    onChange={e => handleFiles(e.target.files)} />
            </div>

            {images?.length > 0 && (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(72px,1fr))] gap-2 mt-2">
                    {images.map((img, i) => (
                        <div key={i} className="relative rounded-lg overflow-hidden aspect-square bg-[#f0e8e0]">
                            <img src={img.url} alt="Variant" className="w-full h-full object-cover block" />
                            <button
                                type="button"
                                onClick={() => onRemove(i)}
                                className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/70 text-white text-[10px] cursor-pointer flex items-center justify-center hover:bg-red-600 transition-colors"
                            >✕</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// ── Variant Card ──────────────────────────────────────────────────────────────
const VariantCard = ({ variant, onStockChange, onDelete }) => {
    const attrs = variant.attributes instanceof Map
        ? Object.fromEntries(variant.attributes)
        : (variant.attributes || {});

    return (
        <div className="bg-white border border-black/10 rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200">
            <div className="relative aspect-4/3 bg-[#f5efe9]">
                {variant.images?.length > 0 ? (
                    <img src={variant.images[0]?.url} alt="Variant" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl opacity-30">🖼</div>
                )}
                <button
                    type="button"
                    onClick={() => onDelete(variant._id)}
                    className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 bg-white/90 border border-black/10 rounded-md text-red-500 hover:bg-red-50 transition-colors"
                >
                    Remove
                </button>
            </div>

            <div className="p-3 flex flex-col gap-2.5 flex-1">
                <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-[#1a1108]">
                        ₹{Number(variant.price?.amount).toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-black/30">{variant.price?.currency}</span>
                </div>

                {Object.keys(attrs).length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {Object.entries(attrs).map(([k, v]) => (
                            <AttrChip key={k} attrKey={k} value={v} />
                        ))}
                    </div>
                )}

                <div className="pt-2 border-t border-black/5">
                    <p className="text-[9px] font-bold tracking-widest text-black/30 mb-1.5">STOCK</p>
                    <InlineStockEditor stock={variant.stock} onChange={n => onStockChange(variant._id, n)} />
                </div>
            </div>
        </div>
    );
};

// ── Add Variant Form ──────────────────────────────────────────────────────────
const EMPTY_VARIANT = {
    price: { amount: "", currency: "INR" },
    stock: 0,
    images: [],
    attrKey: "",
    attrValue: "",
    attributes: {},
};

const AddVariantForm = ({ basePrice, onAdd }) => {
    const [open, setOpen] = useState(true);
    const [form, setForm] = useState({ ...EMPTY_VARIANT, price: { amount: basePrice ?? "", currency: "INR" } });
    const [errors, setErrors] = useState({});

    const setField = (field, value) => {
        setForm(f => ({ ...f, [field]: value }));
        setErrors(e => ({ ...e, [field]: false }));
    };

    const addAttr = () => {
        if (!form.attrKey.trim()) { setErrors(e => ({ ...e, attrKey: true })); return; }
        if (!form.attrValue.trim()) { setErrors(e => ({ ...e, attrValue: true })); return; }
        setForm(f => ({
            ...f,
            attributes: { ...f.attributes, [f.attrKey.trim().toLowerCase()]: f.attrValue.trim() },
            attrKey: "",
            attrValue: "",
        }));
    };

    const removeAttr = (key) => {
        setForm(f => {
            const a = { ...f.attributes };
            delete a[key];
            return { ...f, attributes: a };
        });
    };

    const handleSubmit = () => {
        if (!form.price.amount || isNaN(Number(form.price.amount))) {
            setErrors(e => ({ ...e, amount: true }));
            return;
        }
        onAdd({
            _id: "var_" + Math.random().toString(36).slice(2, 9),
            images: form.images,
            stock: form.stock,
            attributes: form.attributes,
            price: { amount: form.price.amount, currency: form.price.currency },
        });
        setForm({ ...EMPTY_VARIANT, price: { amount: basePrice ?? "", currency: "INR" } });
        setErrors({});
    };

    return (
        <div className="border border-black/10 rounded-[12px] overflow-hidden bg-white h-full flex flex-col">
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between px-4 py-3.5 border-b border-black/10 hover:bg-[#faf8f5] transition-colors"
            >
                <span className="text-sm font-bold text-[#1a1108]">Add New Variant</span>
                <span className="text-xs text-black/30">{open ? "▲" : "▼"}</span>
            </button>

            {open && (
                <div className="p-4 flex flex-col gap-4 flex-1 justify-between">
                    <div className="flex flex-col gap-4">
                        {/* Price */}
                        <div>
                            <p className="text-[9px] font-bold tracking-widest text-black/40 mb-1.5 uppercase">Price</p>
                            <div className="flex gap-2">
                                <label className="relative block flex-1">
                                    <input
                                        type="number"
                                        placeholder=" "
                                        value={form.price.amount}
                                        onChange={e => setField("price", { ...form.price, amount: e.target.value })}
                                        className={`peer w-full pt-5 pr-2 pb-1.5 pl-2.5 outline-none rounded-[10px] text-[clamp(11px,1.6vw,13px)] border ${errors.amount ? "border-red-400" : "border-black"}`}
                                    />
                                    <span className="absolute left-2.5 top-3.5 text-[clamp(10px,1.4vw,12px)] cursor-text transition-all duration-250 ease-out pointer-events-none peer-focus:top-1 peer-focus:text-[10px] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-semibold">
                                        Amount
                                    </span>
                                </label>
                                <select
                                    value={form.price.currency}
                                    onChange={e => setField("price", { ...form.price, currency: e.target.value })}
                                    className="w-[22%] py-3.5 px-2 outline-none border border-black/50 rounded-lg text-xs cursor-pointer focus:border-black transition-colors appearance-none"
                                >
                                    {["INR", "USD", "GBP", "JPY", "EUR"].map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            {errors.amount && <p className="text-[10px] text-red-500 mt-1">Enter a valid price</p>}
                        </div>

                        {/* Stock */}
                        <div>
                            <p className="text-[9px] font-bold tracking-widest text-black/40 mb-2 uppercase">Initial Stock</p>
                            <div className="flex items-center gap-3">
                                <button type="button" onClick={() => setField("stock", Math.max(0, form.stock - 1))}
                                    className="w-8 h-8 rounded-lg border border-black/20 text-base flex items-center justify-center hover:border-black/50 transition-colors">
                                    −
                                </button>
                                <span className="w-7 text-center font-bold text-sm">{form.stock}</span>
                                <button type="button" onClick={() => setField("stock", form.stock + 1)}
                                    className="w-8 h-8 rounded-lg border border-black/20 text-base flex items-center justify-center hover:border-black/50 transition-colors">
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Images */}
                        <div>
                            <p className="text-[9px] font-bold tracking-widest text-black/40 mb-1.5 uppercase">Variant Images</p>
                            <ImageUploadZone
                                images={form.images}
                                onAdd={img => setForm(f => ({ ...f, images: [...f.images, img] }))}
                                onRemove={i => setForm(f => ({ ...f, images: f.images.filter((_, j) => j !== i) }))}
                            />
                        </div>

                        {/* Attributes */}
                        <div>
                            <p className="text-[9px] font-bold tracking-widest text-black/40 mb-1.5 uppercase">Attributes</p>
                            <div className="flex gap-2 mb-2">
                                <input
                                    placeholder="Key (e.g. color)"
                                    value={form.attrKey}
                                    onChange={e => setField("attrKey", e.target.value)}
                                    className={`flex-1 px-2.5 py-2 border rounded-[10px] text-xs outline-none font-mono transition-colors ${errors.attrKey ? "border-red-400" : "border-black/30 focus:border-black"}`}
                                />
                                <input
                                    placeholder="Value (e.g. white)"
                                    value={form.attrValue}
                                    onChange={e => setField("attrValue", e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && addAttr()}
                                    className={`flex-1 px-2.5 py-2 border rounded-[10px] text-xs outline-none transition-colors ${errors.attrValue ? "border-red-400" : "border-black/30 focus:border-black"}`}
                                />
                                <button type="button" onClick={addAttr}
                                    className="px-3 py-2 rounded-[10px] border border-black/20 text-xs font-bold text-[#6F4E37] bg-[#f5efe9] hover:bg-[#ecddd3] transition-colors">
                                    + Add
                                </button>
                            </div>
                            {Object.keys(form.attributes).length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                    {Object.entries(form.attributes).map(([k, v]) => (
                                        <AttrChip key={k} attrKey={k} value={v} onRemove={() => removeAttr(k)} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <button type="button" onClick={handleSubmit}
                        className="w-full mt-4 py-2.5 bg-[#6F4E37] text-white text-sm font-bold rounded-[10px] hover:bg-[#5c3d2e] transition-colors">
                        Add Variant
                    </button>
                </div>
            )}
        </div>
    );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const EditSellerProduct = () => {
    const [product, setProduct] = useState(null);
    const { handleGetProductDetails } = useProduct();
    const { productId } = useParams();
    const inputRef = useRef();
    const [isDragOver, setIsDragOver] = useState(false);

    useEffect(() => {
        const fetchProductDetail = async () => {
            const productDetails = await handleGetProductDetails(productId);
            setProduct(productDetails);
        };
        fetchProductDetail();
    }, [productId]);

    // ── product field handlers ──
    const handleFieldChange = (field, value) =>
        setProduct(p => ({ ...p, [field]: value }));

    const handlePriceChange = (field, value) =>
        setProduct(p => ({ ...p, price: { ...p.price, [field]: value } }));

    // ── product image handlers ──
    const handleFiles = (files) => {
        Array.from(files).forEach(file => {
            if (!file.type.startsWith("image/")) return;
            const reader = new FileReader();
            reader.onload = e => setProduct(p => ({ ...p, images: [...(p.images || []), { url: e.target.result }] }));
            reader.readAsDataURL(file);
        });
    };

    const removeProductImage = (index) =>
        setProduct(p => ({ ...p, images: p.images.filter((_, i) => i !== index) }));

    // ── variant handlers ──
    const handleAddVariant = (variant) =>
        setProduct(p => ({ ...p, variants: [...(p.variants || []), variant] }));

    const handleStockChange = (id, stock) =>
        setProduct(p => ({ ...p, variants: p.variants.map(v => v._id === id ? { ...v, stock } : v) }));

    const handleDeleteVariant = (id) =>
        setProduct(p => ({ ...p, variants: p.variants.filter(v => v._id !== id) }));

    const totalStock = product?.variants?.reduce((s, v) => s + (v.stock || 0), 0) ?? 0;

    return (
        <main className="flex flex-col items-center min-h-screen w-screen bg-[#111111]/5">
            <Navbar pageName='Edit Product' />

            <form className="flex flex-col gap-6 w-full max-w-6xl p-6 text-black sm:rounded-[20px]">
                
                {/* ── Heading ── */}
                <div className="flex flex-col items-start justify-center">
                    <h1 className="opacity-60">Add variants of this Product</h1>
                    <p className="text-3xl text-[#4a270d] font-semibold tracking-tight relative flex items-center pl-6 mt-1">
                        <span className="absolute left-0 w-3 h-3 rounded-full bg-[#6F4E37]" />
                        <span className="absolute left-0 w-3 h-3 rounded-full bg-[#6F4E37] animate-[ping_1s_linear_infinite]" />
                        Update Product
                    </p>
                </div>

                {/* ── SPLIT TOP CONTAINER (Desktop: Side-by-Side | Mobile: Stacked) ── */}
                <div className="flex flex-col md:flex-row gap-6 items-stretch w-full">
                    
                    {/* LEFT PANEL: Product Details Card */}
                    <div className="flex-1 bg-white border border-black/10 rounded-[12px] p-5 flex flex-col gap-4 shadow-sm">
                        <h2 className="text-sm font-bold text-[#1a1108] border-b border-black/5 pb-2">Product Details</h2>
                        
                        {/* Product Name */}
                        <div className="flex gap-2 w-full">
                            <label className="relative block flex-1">
                                <input
                                    value={product?.title ?? ""}
                                    type="text"
                                    placeholder=" "
                                    required
                                    name="title"
                                    onChange={e => handleFieldChange("title", e.target.value)}
                                    className="peer w-full pt-5 pr-2 pb-1.5 pl-2.5 outline-none rounded-[10px] text-[clamp(11px,1.6vw,13px)] border border-black/20 focus:border-black transition-colors"
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
                                value={product?.description ?? ""}
                                required
                                name="description"
                                onChange={e => handleFieldChange("description", e.target.value)}
                                className="peer w-full pt-5 pr-2 pb-1.5 pl-2.5 outline-none border border-black/20 focus:border-black rounded-[10px] text-[clamp(11px,1.6vw,13px)] min-h-24 resize-none transition-colors"
                            />
                            <span className="absolute left-2.5 top-3.5 text-[clamp(10px,1.4vw,12px)] cursor-text transition-all duration-250 ease-out pointer-events-none peer-focus:text-black peer-focus:top-1 peer-focus:text-[clamp(9px,1.1vw,10px)] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:text-black peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[clamp(9px,1.1vw,10px)] peer-[:not(:placeholder-shown)]:font-semibold">
                                Description
                            </span>
                        </label>

                        {/* Base Price */}
                        <div className="flex items-center gap-2 w-full">
                            <label className="relative block flex-1">
                                <input
                                    value={product?.price?.amount ?? ""}
                                    type="text"
                                    name="amount"
                                    placeholder=''
                                    required
                                    onChange={e => handlePriceChange("amount", e.target.value)}
                                    className="peer w-full pt-5 pr-2 pb-1.5 pl-2.5 outline-none border border-black/20 focus:border-black rounded-[10px] text-[clamp(11px,1.6vw,13px)] transition-colors"
                                />
                                <span className="absolute left-2.5 top-3.5 text-[clamp(10px,1.4vw,12px)] cursor-text transition-all duration-250 ease-out pointer-events-none peer-focus:text-black peer-focus:top-1 peer-focus:text-[clamp(9px,1.1vw,10px)] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:text-black peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[clamp(9px,1.1vw,10px)] peer-[:not(:placeholder-shown)]:font-semibold">
                                    Base Price Amount
                                </span>
                            </label>
                            <div className="w-[25%]">
                                <select
                                    name="currency"
                                    onChange={e => handlePriceChange("currency", e.target.value)}
                                    value={product?.price?.currency ?? ""}
                                    required
                                    className="cursor-pointer w-full py-3.5 px-3 outline-none border border-black/20 rounded-lg text-xs focus:border-black transition-colors appearance-none"
                                >
                                    <option value="" disabled>Currency</option>
                                    <option value="INR">INR</option>
                                    <option value="USD">USD</option>
                                    <option value="GBP">GBP</option>
                                    <option value="JPY">JPY</option>
                                    <option value="EUR">EUR</option>
                                </select>
                            </div>
                        </div>

                        {/* Product Base Images */}
                        <div>
                            <span className="block text-[10px] font-bold mb-1.5 uppercase tracking-wider text-black/50">
                                Base Product Images
                            </span>
                            <div
                                className={`border border-dashed rounded-[10px] py-4 px-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-300 ease-in-out ${
                                    isDragOver ? "border-[#6F4E37] bg-[#f5efe9]" : "border-black/20 hover:border-[#37261b] hover:bg-white/50"
                                }`}
                                onClick={() => inputRef.current.click()}
                                onDrop={e => { e.preventDefault(); setIsDragOver(false); handleFiles(e.dataTransfer.files); }}
                                onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
                                onDragLeave={e => { e.preventDefault(); setIsDragOver(false); }}
                            >
                                <svg className="w-6 h-6 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="3" y="3" width="18" height="18" rx="3" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <path d="M21 15l-5-5L5 21" />
                                </svg>
                                <p className="text-[12px] text-center">
                                    Drop images here or <span className="font-semibold cursor-pointer">browse</span>
                                </p>
                                <input
                                    ref={inputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={e => handleFiles(e.target.files)}
                                />
                            </div>

                            {product?.images?.length > 0 && (
                                <div className="mt-3">
                                    <div className="grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-2">
                                        {product.images.map((img, i) => (
                                            <div key={i} className="relative rounded-lg overflow-hidden aspect-square bg-[#2a2a2a]">
                                                <img src={img.url} alt='Product' className="w-full h-full object-cover block" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeProductImage(i)}
                                                    className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/70 border-none text-white text-[11px] cursor-pointer flex items-center justify-center leading-none transition-colors duration-200 hover:bg-red-600"
                                                    aria-label="Remove image"
                                                >✕</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT PANEL: Add Variant Card */}
                    <div className="flex-1">
                        {product && (
                            <AddVariantForm
                                basePrice={product.price?.amount}
                                onAdd={handleAddVariant}
                            />
                        )}
                    </div>
                </div>

                {/* ── BOTTOM CONTAINER: Variants Display Box ── */}
                <div className="bg-white border border-black/10 rounded-xl p-5 flex flex-col gap-4 shadow-sm w-full">
                    {/* Variants Section Header */}
                    <div className="flex items-center justify-between border-b border-black/5 pb-3">
                        <div>
                            <h2 className="text-sm font-bold text-[#1a1108]">Product Variants</h2>
                            <p className="text-[10px] text-black/40 mt-0.5">
                                {product?.variants?.length ?? 0} variant{(product?.variants?.length ?? 0) !== 1 ? "s" : ""} · {totalStock} units total
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {[
                                { label: "Variants", val: product?.variants?.length ?? 0 },
                                { label: "Stock", val: totalStock },
                            ].map(({ label, val }) => (
                                <div key={label} className="text-center bg-[#fdfbf7] border border-black/10 rounded-xl px-3 py-1">
                                    <p className="text-sm font-extrabold text-[#6F4E37]">{val}</p>
                                    <p className="text-[8px] font-bold tracking-widest text-black/30 uppercase">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Variant Grid List */}
                    {product?.variants?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {product.variants.map(v => (
                                <VariantCard
                                    key={v._id}
                                    variant={v}
                                    onStockChange={handleStockChange}
                                    onDelete={handleDeleteVariant}
                                />
                            ))}
                        </div>
                    ) : (
                        product && (
                            <div className="text-center py-12 border border-dashed border-black/10 rounded-[12px] bg-white/60">
                                <p className="text-2xl mb-2">📦</p>
                                <p className="text-sm font-semibold text-[#1a1108]">No variants added yet</p>
                                <p className="text-[11px] text-black/40 mt-1">Fill out the "Add New Variant" form above to configure options.</p>
                            </div>
                        )
                    )}
                </div>

                {/* ── Global Save Button ── */}
                <button
                    type="submit"
                    className="w-full py-3.5 bg-[#6F4E37] text-white font-bold text-sm rounded-[10px] hover:bg-[#5c3d2e] transition-all shadow-md hover:shadow-lg active:scale-[0.99]"
                >
                    Save Changes
                </button>

            </form>
        </main>
    );
};

export default EditSellerProduct;