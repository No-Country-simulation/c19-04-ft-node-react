import React from "react";

const SecondaryButton = ({
    children,
    onClick,
    disabled,
    classNameSize,
    type,
}) => {
    return (
        <button
            type={type}
            onClick={!disabled ? onClick : null}
            disabled={disabled}
            className={`
        bg-customGray-50 border-2 rounded-lg font-bold shadow-md gap-1 ${classNameSize}
      ${
          disabled
              ? "text-customRed-200 border-customRed-200 cursor-not-allowed"
              : "text-customRed-400 border-customRed-400 hover:text-customRed-500 hover:border-customRed-500  active:text-customRed-600 active:border-customRed-600"
      }
    `}
        >
            {children}
        </button>
    );
};

export default SecondaryButton;
