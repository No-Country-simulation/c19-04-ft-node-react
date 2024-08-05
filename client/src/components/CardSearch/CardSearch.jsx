import Rating from '../Rating/Rating'
import hearthImg from '../../assets/images/corazon.png'
import AdditionalInfoFoodTime from '../AdditonalInfoFood/AdditionalInfoFoodTipe'
import AdditionalInfoFoodUser from '../AdditonalInfoFood/AdditionalInfoFoodUser'
import AdditionalInfoFoodType from '../AdditonalInfoFood/AdditionalInfoFoodType'
import MinButton from '../Buttons/MinButton'
import PlusButton from '../Buttons/PlusButton'
import MainButton from '../Buttons/MainButton'
import useCartAction from '../../utils/hooks/useCartAction'
import { useState } from 'react'
import DetailModal from '../../views/DetailModal/DetailModal'

import { createCartItemObject } from '../../utils/functions/createItemObject'
import { orderSelectorQuantity } from '../../utils/functions/orderSelector'

const CardSearch = ({ _id, title, description, timePreparation, price, imgUrl }) => {

    const itemPayLoad = createCartItemObject(_id, title, description, price, imgUrl, timePreparation)

    const { handleDecrement, handleIncrement } = useCartAction();
    const quantity = orderSelectorQuantity(itemPayLoad)?.quantity ?? 0


    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const productforModal = {
        _id: _id,
        title: title,
        image: imgUrl,
        details: description,
        time: timePreparation,
        price: price
    }

    return (
        <div className='min-w-[270px] max-w-[270px] h-[563px] bg-customGray-50 flex flex-col items-center rounded-[22px] shadow-custom-light-focushovered p-5 '>
            <div
                className={`fixed inset-0 z-50 flex items-end justify-center transition-transform duration-700 ease-in-out ${modalIsOpen ? "translate-y-0" : "translate-y-full"
                    }`}
            >
                {modalIsOpen &&
                    <DetailModal onClose={closeModal} isOpen={modalIsOpen} product={productforModal} />
                }
            </div>
            <div className='inline-flex justify-between w-full '>
                <Rating />
                <img className="w-6 h-[22.5px]" src={hearthImg} alt="favorite" />
            </div>
            <button onClick={openModal}>
                <img className='min-w-[243px] min-h-[180px] rounded-lg mt-1' src={imgUrl} alt="" />
            </button>
            <article className='pt-4'>
                <h2 className='text-2xl font-bold leading-[30.24px] line-clamp-1'>{title}</h2>
                <p className='text-sm leading-[17.64px] text-gray-600 text-wrap line-clamp-4 h-4-line'>
                    {description}
                </p>
                <div className='w-max flex justify-between gap-1 mt-5'>
                    <AdditionalInfoFoodTime time={timePreparation} />
                    <AdditionalInfoFoodUser />
                    <AdditionalInfoFoodType />
                </div>
                <div className='pt-10'>
                    <p className='text-[32px] font-bold leading-[40.32px] pb-2'>${price}</p>
                    <p className='text-[12px] leading-[15.12px] text-gray-400'>Este producto no está en tu pedido aún</p>
                    <div className='flex mt-6 gap-3'>
                        <MinButton classNameIcon="w-[22px] h-[22px]" onClick={() => handleDecrement(itemPayLoad)} />
                        <PlusButton classNameIcon="w-[22px] h-[22px]" onClick={() => handleIncrement(itemPayLoad)} />
                        <MainButton
                            classNameSize="h-[40px] grow"
                            children={`Añadir ${quantity}`}
                            disabled={quantity ? 'disabled' : null}
                            onClick={() => handleIncrement(itemPayLoad)}
                        />

                    </div>
                </div>

            </article>


        </div>
    )
}

export default CardSearch