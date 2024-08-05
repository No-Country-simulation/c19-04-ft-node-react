import React from "react";
import { ReactSVG } from "react-svg";

const IconButtonMain = ({onClick, disabled, icon, classNameIcon}) => {
  return (
    <button
      onClick={!disabled ? onClick : null}
      disabled={disabled}
      className={`
        flex justify-center rounded-lg text-white font-bold p-4 shadow-md
      ${
        disabled
          ? "bg-customRed-200 cursor-not-allowed"
          : "bg-customRed-400 hover:bg-red-500 active:bg-red-600"
      }
    `}
    >
      <ReactSVG src={icon} className={`inline-block ${classNameIcon}`} />
    </button>
  );
};

export default IconButtonMain;
