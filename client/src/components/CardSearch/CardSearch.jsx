import Rating from '../Rating/Rating'
import hearthImg from '../../assets/images/corazon.png'
import hamburguesaImg from '../../assets/images/imgHamburgesa.png'
import AdditionalInfoFoodTime from '../AdditonalInfoFood/AdditionalInfoFoodTipe'
import AdditionalInfoFoodUser from '../AdditonalInfoFood/AdditionalInfoFoodUser'
import AdditionalInfoFoodType from '../AdditonalInfoFood/AdditionalInfoFoodType'
import MinButton from '../Buttons/MinButton'
import PlusButton from '../Buttons/PlusButton'
import MainButton from '../Buttons/MainButton'

const CardSearch = () => {
    return (
        <div className='w-[270px] h-[563px] bg-customGray-50 flex flex-col items-center rounded-[22px] shadow-custom-light-focushovered p-5 '>
            <div className='inline-flex justify-between w-full '>
                <Rating />
                <img className="w-6 h-[22.5px]" src={hearthImg} alt="favorite" />
            </div>
            <img className='w-[243px] h-[244px] -translate-y-[10%]' src={hamburguesaImg} alt="" />
            <article className='-translate-y-[16%]'>
                <h2 className='text-2xl font-bold leading-[30.24px] '>Gran Wilde</h2>
                <p className='text-sm leading-[17.64px] text-gray-600 text-wrap line-clamp-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sint ea impedit, soluta repudiandae doloribus vel architecto fugit.
                    Culpa rem nam qui assumenda, eum ratione suscipit odit sapiente eius nihil laboriosam?
                </p>
                <div className='w-max flex justify-between gap-1 mt-5'>
                    <AdditionalInfoFoodTime />
                    <AdditionalInfoFoodUser />
                    <AdditionalInfoFoodType />
                </div>
                <div className='pt-10'>
                    <p className='text-[32px] font-bold leading-[40.32px] pb-2'>$9000</p>
                    <p className='text-[12px] leading-[15.12px] text-gray-400'>Este producto no está en tu pedido aún</p>
                    <div className='flex mt-6 gap-3'>
                        <MinButton classNameIcon="w-[22px] h-[22px]" />
                        <PlusButton classNameIcon="w-[22px] h-[22px]" />
                        <MainButton classNameSize="h-[40px] grow" children="Añadir (1)"/>

                    </div>
                </div>

            </article>


        </div>
    )
}

export default CardSearch