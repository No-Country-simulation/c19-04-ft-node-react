import React from 'react'
import successSvg from "../../assets/svg/success.svg"
const SuccessPopup = ({message}) => {
  return (
    <div className='flex gap-[11px] items-center w-[400px] h-10 rounded-lg border p-[10px] bg-customGreen-100 border-customGreen-600'>
        <img src={successSvg} alt="succes" />
        <p className='leading-5 text-customGreen-600'>
            {message ? message : "La acción se realizó con éxito"}
        </p>
    </div>
  )
  
}

export default SuccessPopup