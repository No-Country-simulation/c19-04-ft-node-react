import useCartAction from "../../utils/hooks/useCartAction"
import { orderSelectorQuantity } from "../../utils/functions/orderSelector"
import { createCartItemObject } from   "../../utils/functions/createItemObject.js"

const CardsMainMenu = ({ img, title, extraInfo, price }) => {

    const itemPayload = createCartItemObject(title,extraInfo,price,img)
    const { handleDecrement, handleIncrement } = useCartAction();
    const quantity = orderSelectorQuantity(itemPayload)?.quantity ?? 0

    return (
        <div className="w-[168px] min-h-[225px] rounded-[20px] bg-customLight flex flex-col text-black overflow-hidden shadow-md shadow-gray-600">
            <div className="grow">
                <img className="object-cover w-full h-full" src={img} alt="" />
            </div>
            <div className="tracking-tight min-h-[88px] max-h-[89px] mb-2">
                <section className="flex flex-col gap-1 m-2 ">
                    <p className="font-bold overflow-hidden whitespace-nowrap text-ellipsis word-spacing-tight">{title}</p>
                    <p className="text-[12px] overflow-hidden whitespace-nowrap text-ellipsis">{extraInfo}</p>
                    <div className="flex justify-between items-center text-lg">
                        <p className="text-customGreen font-bold">
                            {price}
                        </p>
                        <div className="bg-gray-300 rounded-[20px] w-[82px] h-8 flex justify-around items-center">
                            <button
                                className="flex items-center justify-center w-6 h-6 bg-blue-400 rounded-full"
                                onClick={() => { handleDecrement(itemPayload) }}>-</button>
                            <p className="flex items-center justify-center">{quantity}</p>
                            <button
                                className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full"
                                onClick={() => { handleIncrement(itemPayload) }}>+</button>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    )
}

export default CardsMainMenu