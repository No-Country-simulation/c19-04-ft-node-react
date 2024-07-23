import useCartAction from "../../utils/hooks/useCartAction"
import { orderSelectorQuantity } from "../../utils/functions/orderSelector"
import { createCartItemObject } from "../../utils/functions/createItemObject.js"
import corazonImg from "../../assets/images/corazon.png"
import imgHamburguesaPrueba from "../../assets/images/imgHamburgesa.png"
import Rating from "../Rating/Rating.jsx"

const CardsMainMenu = ({ _id, title, imgUrl, price, description, time }) => {

    const itemPayload = createCartItemObject(_id, title, description, price, imgUrl, time)
    const { handleDecrement, handleIncrement } = useCartAction();
    const quantity = orderSelectorQuantity(itemPayload)?.quantity ?? 0

    return (
        <div className="bg-customGray-50 w-[180px] min-h-[177px] rounded-[10px] bg-customLight flex flex-col gap-[5px] pt-[50px] p-[10px] text-black shadow-custom-light relative">
            <div className="absolute inset-0 flex items-center justify-center -translate-y-2/4">
                <img className="object-cover w-[160px] h-[90px] rounded-3xl" src={imgUrl} alt={title} />
            </div>
            <div className="tracking-tight gap-[5px]">
                <section className="flex flex-col gap-[5px]">
                    <div className="flex justify-between">
                        <p className="text-lg leading-[22.68px] font-bold overflow-hidden whitespace-nowrap text-ellipsis word-spacing-tight">{title}</p>
                        <img className="w-6 h-[22.5px]" src={corazonImg} alt="favorite" />
                    </div>
                    <p className="text-sm text-customGray-400 leading-[17.64px] overflow-hidden text-ellipsis line-clamp-2 h-2-line">{description}</p>

                    <div className="flex justify-between items-center text-lg mt-1">
                        <p className="leading-[22.68px] font-bold">
                            ${price}
                        </p>
                        <div className="flex justify-around gap-2 items-center">
                            <button
                                className="flex items-center justify-center w-[16px] h-[16px] text-xs border border-black rounded-full"
                                onClick={() => { handleDecrement(itemPayload) }}>-</button>
                            <p className="flex items-center justify-center text-sm">{quantity}</p>
                            <button
                                className="flex items-center justify-center w-[16px] h-[16px] text-xs border border-black rounded-full"
                                onClick={() => { handleIncrement(itemPayload) }}>+</button>
                        </div>

                    </div>
                    <div className="flex items-center w-[78px] h-[13.13px] gap-[5px] ">
                        <Rating />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default CardsMainMenu
