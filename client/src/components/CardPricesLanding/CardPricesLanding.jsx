import React from 'react'
import MainButton from '../Buttons/MainButton'
import chekLanding from "../../assets/svg/checkLanding.svg"

const CardPricesLanding = ({ typePrice, price, info, isRecomend }) => {
    return (
        <div className='bg-white h-[481px] max-w-[403px] w-[403px] rounded-[20px] p-[30px] flex flex-col gap-4 hover:bg-black hover:text-white transition-colors duration-300'>
            <div>
                <p className='text-2xl'>Plan <span className='font-bold'>{typePrice}</span></p>
            </div>
            <div className='text-center flex justify-start items-center gap-2'>
                <p className='text-5xl font-bold'>${price}</p>
                <p>/mes</p>
            </div>
            <div className=''>
                <MainButton children="Adquirir Plan" classNameSize="w-[343px] h-[40px] mt-1 mb-6" />
                <hr className='border-t border-gray-300 hover:border-white transition-colors duration-300' />
            </div>
            <div>
                <ul className='flex flex-col gap-4'>
                    {info.map((element, index) => (
                        <li className='flex gap-2 text-sm' key={index}>
                            <img src={chekLanding} alt="" className='filter hover:brightness-0 transition-all duration-300' />
                            <p>{element}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default CardPricesLanding
