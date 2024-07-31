import React from 'react'

const CardClientLanding = ({imgClient}) => {
  return (
    <div className='bg-customBgMain max-w-[500px] w-[500px] max-h-[250px] h-[300px] rounded-[20px] p-[10px] shadow-custom-light-focushovered flex justify-center items-center'>
        <img src={imgClient} alt="imgClients" className='w-[250px] h-[166px]'/>
    </div>
  )
}

export default CardClientLanding