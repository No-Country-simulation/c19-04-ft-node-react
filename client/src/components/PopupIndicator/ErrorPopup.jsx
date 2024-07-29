import React from 'react'
import errorSvg from "../../assets/svg/errorPopup.svg"
const ErrorPopup = ({ message }) => {
    return (
        <div className='flex gap-[11px] items-center w-[400px] h-10 rounded-lg border p-[10px] bg-red-100 border-red-600'>
            <img src={errorSvg} alt="succes" />
            <p className='leading-5 text-red-600'>
                {message ? message : " Ocurrió un error"}
            </p>
        </div>
    )
}

export default ErrorPopup