import React from 'react'

const CardsSolutions = ({imgCard, title, description}) => {
    return (
        <div className='bg-customBgMain max-w-72 max-h-[454px] w-[288px] h-[450px] flex flex-col items-center justify-center text-center rounded-[20px] shadow-custom-light-focushovered '>
            <img src={imgCard} alt="" className='w-[254px]' />
            <h4 className='font-medium text-2xl w-[201px] mb-[10px] leading-[30px]'>
                {title}
            </h4>
            <p className='w-[162px] mb-5 leading-4'>
                {description}
            </p>
        </div>
    )
}

export default CardsSolutions