import { MdDeleteOutline } from "react-icons/md";

const AttributeChip = ({index, attribute, value}) => {
    return <span
    key={index}
    className="flex items-center gap-1 text-xs rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-black">
        <span className="text-black">{attribute}</span>
        <span className="text-gray-500">·</span>
        <span className="text-black">{value}</span>
    </span>
}

const VariantCard = ({ image, attributes = {}, price, currency = "INR", stock = 0 }) => {
    return (
        <main className="w-full border border-black/10 shadow-md rounded-md text-black">
            <div className="flex items-start justify-between">
                <div className="w-30 h-30 shrink-0 rounded-md overflow-hidden flex items-center justify-center p-2">
                    <img
                        src={image}
                        alt="Variant"
                        className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 flex flex-col h-full justify-between px-5 py-2 gap-1">
                    {
                        Object.keys(attributes).length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {
                                    Object.keys(attributes).map((attribute, index) => {
                                        console.log(attribute);
                                        return <AttributeChip 
                                        key={index}
                                        attribute={attribute}
                                        value={attributes[attribute]}
                                        />
                                    })
                                }
                            </div>
                        )
                    }

                    <p><span className="text-sm">Price : </span>{currency} {price ? price : '0'}</p>
                </div>

                <button className="bg-red-100 border border-red-500/30 rounded-sm mt-2 mr-3 cursor-pointer text-xs px-3 py-0.5 active:scale-90 duration-300 ease-in-out tracking-wide">
                    <MdDeleteOutline size={21} fontWeight='normal' color="red" />
                </button>
            </div>

            <div className="flex items-center justify-between px-4 py-1.5 bg-[#fffceb]">
                <p className="tracking-wide">Current Stock</p>
                <div className="rounded-sm border border-black/20 px-6 min-w-16 text-center bg-white">
                    <span className="text-lg font-medium text-black/90">{stock}</span>
                </div>
            </div>
        </main>
    );
}

export default VariantCard;