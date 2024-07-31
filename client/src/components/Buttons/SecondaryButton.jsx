import React from "react";
import "../../styles/effectRadar.css"
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
        bg-customGray-50 border-2 rounded-lg font-bold shadow-md gap-1 ${classNameSize} btn-secondary
      ${disabled
                    ? "text-customRed-200 border-customRed-200 cursor-not-allowed"
                    : "text-customRed-400 border-customRed-400 hover:text-customRed-700 hover:border-customRed-700  active:text-customRed-700 active:border-custom-600 "
                }
    `}
        >
            {children}
        </button>
    );
};

export default SecondaryButton;
