import React from "react";
import { ReactSVG } from "react-svg";

const MainIconButton = ({ children, onClick, disabled, icon }) => {
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
      {children}
      <ReactSVG src={icon} className="inline-block ml-2 w-6" />
    </button>
  );
};

export default MainIconButton;
