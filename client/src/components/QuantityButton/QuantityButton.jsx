import React from "react";

function QuantityButton() {
  return (
    <div className="rounded-[450px] h-[45px] bg-gray-400">
      <button className="rounded-[450px] h-[45px] w-[45px] text-xl bg-gray-400 border border-customLight">
        -
      </button>
      <span className="mx-4 text-xl">0</span>
      <button className="rounded-[450px] h-[45px] w-[45px] text-customLight text-xl bg-customBlue ">
        +
      </button>
    </div>
  );
}

export default QuantityButton;
