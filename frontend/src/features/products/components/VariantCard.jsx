import { formatAmount } from "../../../shared/components/utils/priceFormat.util";
import DeleteButton from "./DeleteButton";

export const AttributeChip = ({index, attribute, value}) => {
    return <div
    key={index}
    className="flex items-center lg:gap-1 gap-0.5 text-xs rounded-full border border-[#4a270d]/50 bg-[#4a270d]/10 h-fit lg:px-3 lg:py-1 p-1 text-black">
        <span className="text-black">{attribute}</span>
        <span className="text-gray-500">·</span>
        <span className="text-black">{value}</span>
    </div>
}

const VariantCard = ({ image, attributes = {}, price, stock = 0, handleConfirmDelete }) => {
    return (
        <main className="w-full border border-black/10 shadow-md rounded-md text-black">
            <div className="flex items-start justify-between">
                <div className="w-30 h-30 rounded-md overflow-hidden flex items-center justify-center p-2">
                    <img
                        src={image}
                        alt='Variant'
                        className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 flex flex-col h-full justify-between px-5 py-2 gap-1">
                    {
                        Object.keys(attributes).length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4 h-20 overflow-hidden"
                            style={{
                                scrollbarWidth: 'none'
                            }}
                            >
                                {
                                    Object.keys(attributes).map((attribute, index) => {
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

                    <p>{formatAmount(price)}</p>
                </div>

                <div onClick={handleConfirmDelete} className="lg:px-3 lg:py-2 p-1">
                    <DeleteButton />
                </div>
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