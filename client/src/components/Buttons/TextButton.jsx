import React from "react";

const TextButton = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={!disabled ? onClick : null}
      disabled={disabled}
      className={`
        flex justify-center text-customRed-500 font-bold p-3 focus:outline-none gap-1
      ${
        disabled
          ? "text-customRed-200 border-customRed-200 cursor-not-allowed"
          : "hover:text-customRed-600 hover:border-customRed-600  active:text-customRed-700 active:border-customRed-700"
      }
    `}
    >
      {children}
    </button>
  );
};

export default TextButton;
