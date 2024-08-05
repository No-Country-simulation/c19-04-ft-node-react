import React from 'react'
import { ReactSVG } from "react-svg";

const SecondaryIconButton = ({children, onClick, disabled, icon}) => {
  return (
    <button
      onClick={!disabled ? onClick : null}
      disabled={disabled}
      className={`
        flex justify-center bg-customGray-50 border-2 rounded-lg  font-bold p-4 shadow-md gap-1
      ${
        disabled
          ? "text-customRed-200 border-customRed-200 cursor-not-allowed"
          : "text-customRed-400 border-customRed-400 hover:text-customRed-500 hover:border-customRed-500  active:text-customRed-600 active:border-customRed-600"
      }
    `}
    >
      {children}
      <ReactSVG src={icon} className="inline-block ml-2 w-6" />
    </button>
  )
}

export default SecondaryIconButton
