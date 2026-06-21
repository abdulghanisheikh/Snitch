const ProductDetails = () => {
    return (
        <main className="min-h-screen bg-stone-100 flex items-center justify-center p-6">
            <div className="w-full max-w-4xl bg-white border border-stone-200 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
                {/* Product image */}
                <div className="relative bg-stone-200">
                    <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHpiWUcwCIlYnzhFgBbxxuOH42GGUPjJyYzwmDp21Z2UBBJl4XrQwnx22B&s=10'
                        alt="No Image"
                        className="w-full h-full object-cover min-h-90 md:min-h-130"
                    />
                </div>

                {/* Product details */}
                <div className="flex flex-col justify-center px-8 py-10 md:px-12">
                    <p className="text-xs tracking-[0.15em] uppercase text-stone-400 mb-3">
                        Leather Goods — Atelier
                    </p>

                    <h1 className="font-serif text-3xl text-stone-900 mb-2">
                        Atelier Tote
                    </h1>
                    <div className="w-8 border-b-2 border-stone-900 mb-4" />

                    <p className="text-[#9c6b4f] font-medium mb-5">$350.00</p>

                    <p className="text-sm text-stone-600 leading-relaxed max-w-sm mb-6">
                        A masterclass in restraint. Hand-stitched from full-grain
                        vegetable-tanned leather, the Atelier Tote features an
                        architectural silhouette designed to age beautifully with the
                        passage of time.
                    </p>

                    <hr className="border-stone-200 mb-5" />

                    <div className="flex flex-col gap-3">
                        <button
                            type="button"
                            className="w-full bg-stone-900 text-white text-sm tracking-widest uppercase py-3 hover:bg-stone-800 cursor-pointer rounded-xs"
                        >
                            Add to Bag
                        </button>
                        <button
                            type="button"
                            className="w-full border border-stone-900 text-stone-900 text-sm tracking-widest uppercase py-3 flex items-center justify-center gap-2 hover:bg-stone-50 cursor-pointer rounded-xs"
                        >
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProductDetails;