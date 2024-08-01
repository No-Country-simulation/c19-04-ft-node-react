import React from 'react'
import imageLanding from "../../assets/images/imageLanding.png"
import MainButton from '../../components/Buttons/MainButton'
import SecondaryButton from '../../components/Buttons/SecondaryButton'

const SectionMainLanding = () => {
    return (
        <div className='flex justify-between mt-10 gap-10'>
            <div className='mt-24 max-w-screen-md max-h-60 '>
                <h1 className='text-2xl font-bold break-words sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-5'>
                    Gestioná tu negocio de manera eficiente y en tiempo real
                </h1>
                <p className='text-[14px] break-words sm:text-[18px] md:text-[22px] lg:text-[26px] leading-8'>
                    Nuestro servicio es tu mejor herramienta para administrar tu negocio y aumentar tus rendimientos
                </p>

                <div className='flex gap-3 mt-12'>
                    <MainButton children="Empezá Ahora" classNameSize="h-[40px] w-[136px]" />
                    <SecondaryButton children="Ver Demo" classNameSize="w-[116px]" />
                </div>
            </div>
            <div className='max-w-[40%] min-w-[39%]'>
                <img src={imageLanding} alt="imageLanding" className='rounded-[75px] object-cover max-h-[579px]' />
            </div>
        </div>
    )
}

export default SectionMainLanding