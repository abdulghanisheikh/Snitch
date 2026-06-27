import Navbar from "../../../shared/components/Navbar";

// ── Pure UI: Attribute Chip ───────────────────────────────────────────────────
const AttrChip = ({ attrKey, value }) => (
    <div className="inline-flex items-center gap-1 bg-[#f5efe9] border border-black/20 rounded-full py-0.5 pl-3 pr-2">
        <span className="text-[10px] font-bold font-mono text-[#8b6350]">{attrKey}</span>
        <span className="text-[10px] text-[#b5a090]">·</span>
        <span className="text-[11px] text-[#1a1108]">{value}</span>
        <button type="button" className="text-[#b5a090] text-xs ml-0.5 leading-none hover:text-red-500 transition-colors">
            ✕
        </button>
    </div>
);

// ── Pure UI: Stock Badge ──────────────────────────────────────────────────────
const StockBadge = ({ stock }) => {
    if (stock === 0) return <span className="text-[10px] font-bold tracking-wide px-2.5 py-0.5 rounded-full bg-red-50 text-red-600">Out of stock</span>;
    if (stock <= 2) return <span className="text-[10px] font-bold tracking-wide px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700">Low · {stock}</span>;
    return <span className="text-[10px] font-bold tracking-wide px-2.5 py-0.5 rounded-full bg-green-50 text-green-700">In stock · {stock}</span>;
};

// ── Pure UI: Image Upload Zone ────────────────────────────────────────────────
const ImageUploadZone = () => (
    <div>
        <div className="border border-dashed border-black/20 rounded-[10px] py-5 px-3 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-[#37261b] hover:bg-white/50 transition-all duration-300">
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
            <input type="file" accept="image/*" multiple className="hidden" />
        </div>
    </div>
);

// ── Pure UI: Variant Card ─────────────────────────────────────────────────────
const VariantCard = () => (
    <div className="bg-white border border-black/20 rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200">
        <div className="relative aspect-4/3 bg-[#f5efe9]">
            <div className="w-full h-full flex items-center justify-center text-2xl opacity-30">🖼</div>
            <button type="button" className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 bg-white/90 border border-black/20 rounded-md text-red-500 hover:bg-red-50 transition-colors">
                Remove
            </button>
        </div>

        <div className="p-3 flex flex-col gap-2.5 flex-1">
            <div className="flex items-center justify-between">
                <span className="text-base font-bold text-[#1a1108]">₹0</span>
                <span className="text-[10px] text-black/30">INR</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
                <AttrChip attrKey="Sample" value="Variant" />
            </div>

            <div className="pt-2 border-t border-black/20">
                <p className="text-[9px] font-bold tracking-widest text-black/30 mb-1.5">STOCK</p>
                <div className="flex items-center gap-2 group cursor-pointer">
                    <StockBadge stock={5} />
                    <span className="text-[10px] text-[#b5a090] group-hover:text-[#6F4E37] transition-colors">✎ edit</span>
                </div>
            </div>
        </div>
    </div>
);

// ── Pure UI: Add Variant Form Card ────────────────────────────────────────────
const AddVariantFormCard = () => (
    <div className="border border-black/20 rounded-xl overflow-hidden bg-white h-full flex flex-col shadow-sm">
        <div className="w-full flex items-center justify-between px-4 py-3.5 border-b border-black/20">
            <span className="text-sm font-bold text-[#1a1108]">Add New Variant</span>
        </div>

        <div className="p-4 flex flex-col gap-4 flex-1 justify-between">
            <div className="flex flex-col gap-4">
                {/* Price Box */}
                <div>
                    <p className="text-[9px] font-bold tracking-widest text-black/40 mb-1.5 uppercase">Price</p>
                    <div className="flex gap-2">
                        <label className="relative block flex-1">
                            <input type="number" placeholder=" " className="peer w-full pt-5 pr-2 pb-1.5 pl-2.5 outline-none rounded-[10px] text-[clamp(11px,1.6vw,13px)] border border-black/20 focus:border-black transition-colors" />
                            <span className="absolute left-2.5 top-3.5 text-[clamp(10px,1.4vw,12px)] cursor-text transition-all duration-250 ease-out pointer-events-none peer-focus:top-1 peer-focus:text-[10px] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-semibold">
                                Amount
                            </span>
                        </label>
                        <select className="w-[25%] py-3.5 px-2 outline-none border border-black/20 rounded-lg text-xs cursor-pointer focus:border-black transition-colors appearance-none bg-transparent">
                            {["INR", "USD", "GBP", "JPY", "EUR"].map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                {/* Stock Box */}
                <div>
                    <p className="text-[9px] font-bold tracking-widest text-black/40 mb-2 uppercase">Initial Stock</p>
                    <div className="flex items-center gap-3">
                        <button type="button" className="w-8 h-8 rounded-lg border border-black/20 text-base flex items-center justify-center hover:border-black/50 transition-colors">−</button>
                        <span className="w-7 text-center font-bold text-sm">0</span>
                        <button type="button" className="w-8 h-8 rounded-lg border border-black/20 text-base flex items-center justify-center hover:border-black/50 transition-colors">+</button>
                    </div>
                </div>

                {/* Variant Images Upload Box */}
                <div>
                    <p className="text-[9px] font-bold tracking-widest text-black/40 mb-1.5 uppercase">Variant Images</p>
                    <ImageUploadZone />
                </div>

                {/* Variant Dynamic Attributes Setup */}
                <div>
                    <p className="text-[9px] font-bold tracking-widest text-black/40 mb-1.5 uppercase">Attributes</p>
                    <div className="flex gap-2 mb-2">
                        <input placeholder="Key (e.g. color)" className="flex-1 px-2.5 py-2 border rounded-[10px] border-black/20 focus:border-black text-xs outline-none font-mono transition-colors" />
                        <input placeholder="Value (e.g. white)" className="flex-1 px-2.5 py-2 border rounded-[10px] border-black/20 focus:border-black text-xs outline-none transition-colors" />
                        <button type="button" className="px-3 py-2 rounded-[10px] border border-black/20 text-xs font-bold text-[#6F4E37] bg-[#f5efe9] hover:bg-[#ecddd3] transition-colors">
                            + Add
                        </button>
                    </div>
                </div>
            </div>

            <button type="button" className="w-full mt-4 py-2.5 bg-[#6F4E37] text-white text-sm font-bold rounded-[10px] hover:bg-[#5c3d2e] transition-colors cursor-pointer">
                Add Variant
            </button>
        </div>
    </div>
);

// ── Pure UI: Main App Page Layout Container ───────────────────────────────────
const EditSellerProductUI = () => {
    return (
        <main className="flex flex-col items-center min-h-screen w-screen bg-[#111111]/5">
            {/* Mock Header navbar space */}
            <Navbar pageName="Update Product" />

            <form className="flex flex-col gap-6 w-full max-w-6xl p-6 text-black sm:rounded-[20px]">

                {/* ── Heading Row ── */}
                <div className="flex flex-col items-start justify-center">

                    <h1 className="text-lg">Add variants of this Product</h1>
                    <p className="text-[clamp(34px,4vw,22px)] text-[#4a270d] font-semibold tracking-tight relative flex items-center pl-6">
                        <span className="absolute left-0 w-3 h-3 rounded-full bg-[#6F4E37]" />
                        <span className="absolute left-0 w-3 h-3 rounded-full bg-[#6F4E37] animate-[ping_1s_linear_infinite]"/>
                        Update Product
                    </p>

                </div>

                {/* ── FLEX LAYOUT MATRIX: Splits Side-by-Side on Desktop and Columns on Mobile ── */}
                <div className="flex flex-col md:flex-row gap-6 items-stretch w-full">

                    {/* LEFT CONTAINER COMPONENT: Base Details Profile Card */}
                    <div className="flex-1 bg-white border border-black/20 rounded-xl p-5 flex flex-col gap-4 shadow-sm">
                        <h2 className="text-sm font-bold text-[#1a1108] border-b border-black/20 pb-2">Product Details</h2>

                        {/* Name Input Box Layout */}
                        <div className="flex gap-2 w-full">
                            <label className="relative block flex-1">
                                <input type="text" placeholder=" " required className="peer w-full pt-5 pr-2 pb-1.5 pl-2.5 outline-none rounded-[10px] text-[clamp(11px,1.6vw,13px)] border border-black/20 focus:border-black transition-colors" />
                                <span className="absolute left-2.5 top-3.5 text-[clamp(10px,1.4vw,12px)] cursor-text transition-all duration-250 ease-out pointer-events-none peer-focus:text-black peer-focus:top-1 peer-focus:text-[clamp(9px,1.1vw,10px)] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:text-black peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[clamp(9px,1.1vw,10px)] peer-[:not(:placeholder-shown)]:font-semibold">
                                    Product Name
                                </span>
                            </label>
                        </div>

                        {/* Description Text Input Area layout */}
                        <label className="relative block w-full">
                            <textarea placeholder="" required className="peer w-full pt-5 pr-2 pb-1.5 pl-2.5 outline-none border border-black/20 focus:border-black rounded-[10px] text-[clamp(11px,1.6vw,13px)] min-h-24 resize-none transition-colors" />
                            <span className="absolute left-2.5 top-3.5 text-[clamp(10px,1.4vw,12px)] cursor-text transition-all duration-250 ease-out pointer-events-none peer-focus:text-black peer-focus:top-1 peer-focus:text-[clamp(9px,1.1vw,10px)] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:text-black peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[clamp(9px,1.1vw,10px)] peer-[:not(:placeholder-shown)]:font-semibold">
                                Description
                            </span>
                        </label>

                        {/* Financial Amount Value inputs block */}
                        <div className="flex items-center gap-2 w-full">
                            <label className="relative block flex-1">
                                <input type="text" placeholder='' required className="peer w-full pt-5 pr-2 pb-1.5 pl-2.5 outline-none border border-black/20 focus:border-black rounded-[10px] text-[clamp(11px,1.6vw,13px)] transition-colors" />
                                <span className="absolute left-2.5 top-3.5 text-[clamp(10px,1.4vw,12px)] cursor-text transition-all duration-250 ease-out pointer-events-none peer-focus:text-black peer-focus:top-1 peer-focus:text-[clamp(9px,1.1vw,10px)] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:text-black peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[clamp(9px,1.1vw,10px)] peer-[:not(:placeholder-shown)]:font-semibold">
                                    Base Price Amount
                                </span>
                            </label>
                            <div className="w-[25%]">
                                <select className="cursor-pointer w-full py-3.5 px-3 outline-none border border-black/20 rounded-lg text-xs focus:border-black transition-colors appearance-none bg-transparent">
                                    <option value="INR">INR</option>
                                    <option value="USD">USD</option>
                                    <option value="GBP">GBP</option>
                                    <option value="JPY">JPY</option>
                                    <option value="EUR">EUR</option>
                                </select>
                            </div>
                        </div>

                        {/* Base Product Images Selection section view placeholder */}
                        <div>
                            <span className="block text-[10px] font-bold mb-1.5 uppercase tracking-wider text-black/50">
                                Base Product Images
                            </span>
                            <div className="border border-dashed border-black/20 rounded-[10px] py-4 px-3 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-[#37261b] hover:bg-white/50 transition-all duration-300">
                                <svg className="w-6 h-6 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="3" y="3" width="18" height="18" rx="3" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <path d="M21 15l-5-5L5 21" />
                                </svg>
                                <p className="text-[12px] text-center">
                                    Drop images here or <span className="font-semibold cursor-pointer">browse</span>
                                </p>
                                <input type="file" accept="image/*" multiple className="hidden" />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CONTAINER COMPONENT: Functional Interactive Form Card */}
                    <div className="flex-1">
                        <AddVariantFormCard />
                    </div>
                </div>

                {/* ── LOWER ZONE PANEL CONTAINER: Displays Array Collection items grid list ── */}
                <div className="bg-white border border-black/20 rounded-xl p-5 flex flex-col gap-4 shadow-sm w-full">

                    {/* Header Controls bar space */}
                    <div className="flex items-center justify-between border-b border-black/20 pb-3">
                        <div>
                            <h2 className="text-sm font-bold text-[#1a1108]">Product Variants</h2>
                        </div>
                        <div className="flex gap-2">
                            <div className="text-center bg-[#fdfbf7] border border-black/20 rounded-xl px-3 py-1">
                                <p className="text-sm font-extrabold text-[#6F4E37]">1</p>
                                <p className="text-[8px] font-bold tracking-widest text-black/30 uppercase">Variants</p>
                            </div>
                        </div>
                    </div>

                    {/* Adaptive Array Layout Matrix Grid Block row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <VariantCard />
                    </div>
                </div>

                {/* Global Dispatch trigger button execution panel */}
                <button type="submit" className="w-full py-3.5 bg-[#6F4E37] text-white font-bold text-sm rounded-[10px] hover:bg-[#5c3d2e] transition-all shadow-md active:scale-[0.99] cursor-pointer">
                    Save Changes
                </button>

            </form>
        </main>
    );
};

export default EditSellerProductUI;