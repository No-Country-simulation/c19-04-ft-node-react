import React from "react";

const SecondaryButton = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={!disabled ? onClick : null}
      disabled={disabled}
      className={`
        box-border rounded-lg text-red-600 font-bold p-4 focus:outline-none focus:shadow-outline w-full shadow-md
      ${
        disabled
          ? "bg-red-200 cursor-not-allowed"
          : "bg-white hover:bg-red-600 active:bg-red-900"
      }
    `}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
