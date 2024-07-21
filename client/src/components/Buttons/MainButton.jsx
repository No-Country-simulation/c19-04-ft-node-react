import React from "react";

const MainButton = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={!disabled ? onClick : null}
      disabled={disabled}
      className={`
        box-border rounded-lg text-white font-bold p-4 shadow-md
      ${
        disabled
          ? "bg-customRed-200 cursor-not-allowed"
          : "bg-customRed-400 hover:bg-red-500 active:bg-red-600"
      }
    `}
    >
      {children}
    </button>
  );
};

export default MainButton;
