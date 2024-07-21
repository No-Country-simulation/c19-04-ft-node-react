import React from "react";

const TextButton = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={!disabled ? onClick : null}
      disabled={disabled}
      className={`
        flex justify-center font-bold p-3 gap-1
      ${
        disabled
          ? "text-customRed-200 cursor-not-allowed"
          : "text-customRed-400 hover:text-customRed-500 active:text-customRed-600"
      }
    `}
    >
      {children}
    </button>
  );
};

export default TextButton;
