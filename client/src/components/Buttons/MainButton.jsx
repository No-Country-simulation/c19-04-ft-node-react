import React from "react";

const MainButton = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={!disabled ? onClick : null}
      disabled={disabled}
      className={`
        box-border rounded-lg text-white font-bold p-4 focus:outline-none focus:shadow-outline w-full shadow-md
      ${
        disabled
          ? "bg-red-300 cursor-not-allowed"
          : "bg-red-500 hover:bg-red-600 active:bg-red-900"
      }
    `}
    >
      {children}
    </button>
  );
};

export default MainButton;
