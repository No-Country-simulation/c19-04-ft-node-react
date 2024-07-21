import React from "react";

const MainButton = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={!disabled ? onClick : null}
      disabled={disabled}
      className={`
        box-border rounded-lg text-white font-bold p-4 focus:outline-none focus:shadow-outline shadow-md
      ${
        disabled
          ? "bg-customRed-200 cursor-not-allowed"
          : "bg-customRed-500 hover:bg-red-600 active:bg-red-700"
      }
    `}
    >
      {children}
    </button>
  );
};

export default MainButton;
