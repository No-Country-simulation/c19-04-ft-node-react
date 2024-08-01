import React from 'react'
import analitycs1 from "../../assets/images/analitycSection1.png"
import analitycs2 from "../../assets/images/analitycSection2.png"

const AnalitycsLanding = () => {
    return (
        <div>
            <h4 className='text-[40px] leading-[60px]'>Análisis de Datos</h4>
            <p className='text-2xl leading-[30px] w-[457px]'>Obtén información valiosa para tomar decisiones inteligentes</p>

            <div className='flex justify-between'>
                <img src={analitycs1} alt="analitycs1" />
                <img src={analitycs2} alt="analitycs2" className='mt-9' />
            </div>
        </div>
    )
}

export default AnalitycsLanding