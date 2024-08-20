import React from "react";

const MainButton = ({
    type,
    children,
    onClick,
    disabled,
    classNameSize,
    className,
}) => {
    return (
        <button
            type={type}
            onClick={!disabled ? onClick : null}
            disabled={disabled}
            className={`
        box-border rounded-lg text-white font-bold shadow-md ${classNameSize} ${className}
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
