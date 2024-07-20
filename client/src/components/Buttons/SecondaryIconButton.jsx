import React from 'react'
import { ReactSVG } from "react-svg";

const SecondaryIconButton = ({children, onClick, disabled, icon}) => {
  return (
    <button
      onClick={!disabled ? onClick : null}
      disabled={disabled}
      className={`
        flex justify-center bg-customGray-50 border-2 border-customRed-500 rounded-lg  text-customRed-500 font-bold p-4 focus:outline-none focus:shadow-outline shadow-md gap-1
      ${
        disabled
          ? "text-customRed-200 border-customRed-200 cursor-not-allowed"
          : "hover:text-customRed-600 hover:border-customRed-600  active:text-customRed-700 active:border-customRed-700"
      }
    `}
    >
      {children}
      <ReactSVG src={icon} className="inline-block ml-2 w-6" />
    </button>
  )
}

export default SecondaryIconButton
