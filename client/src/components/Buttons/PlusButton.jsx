import React from 'react'
import { ReactSVG } from 'react-svg'
import plusSvg from '../../assets/svg/plus.svg'

const PlusButton = ({ onClick, disabled, classNameIcon }) => {
  return (
    <button
      onClick={!disabled ? onClick : null}
      disabled={disabled}
      className={`
        flex justify-center bg-customGray-50 border-2 rounded-lg font-bold p-2 shadow-md gap-1
      ${
        disabled
          ? "text-customRed-200 border-customRed-200 cursor-not-allowed"
          : "text-customRed-400 border-customRed-400 hover:text-customRed-500 hover:border-customRed-500  active:text-customRed-600 active:border-customRed-600"
      }
    `}
    >
      <ReactSVG src={plusSvg} className={`inline-block ${classNameIcon}`}/>
    </button>
  )
}

export default PlusButton
