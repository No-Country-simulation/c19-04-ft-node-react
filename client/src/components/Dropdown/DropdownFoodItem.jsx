import { useState } from "react";
import triangleIconSVG from "../../assets/svg/triangle-inverted.svg";
import dollarIconSVG from "../../assets/svg/currency-dollar.svg";
import clockIconSVG from "../../assets/svg/clock.svg";
import starIconSVG from "../../assets/svg/star.svg";

export default function DropdownFoodItem({ food }) {
  const [isOpen, setIsOpen] = useState(false);
  const { name, quantity, price, time, score } = food;

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <button className="w-64 mx-auto" onClick={toggleDropdown}>
      <div
        className={`bg-white shadow-lg rounded-lg transition-[border-radius]  p-4 ${
          isOpen ? "rounded-b-none duration-0" : "duration-1000"
        }`}
      >
        <div className="flex justify-between items-center">
          <p>
            {name} ({quantity})
          </p>
          <div>
            <img
              src={triangleIconSVG}
              alt=""
              className={`w-3 h-3 transform transition-transform duration-500 ${
                isOpen ? "rotate-180" : ""
              } `}
            />
          </div>
        </div>
      </div>
      <div
        className={` rounded-b-lg transition-all duration-500 overflow-hidden ${
          isOpen ? "max-h-40 shadow-lg" : "max-h-0"
        }`}
      >
        <div className="bg-white text-sm flex flex-col px-4 pb-4 space-y-2">
          <ul>
            <li className="flex justify-between">
              <div className="flex gap-2 items-center">
                <img src={dollarIconSVG} alt="" />
                <span className="text-gray-400">Precio:</span>
              </div>
              <span>${price}</span>
            </li>
            <li className="flex justify-between mt-2">
              <div className="flex gap-2 items-center">
                <img src={clockIconSVG} alt="" />
                <span className="text-gray-400">Tiempo:</span>
              </div>
              <span>{time}</span>
            </li>
            <li className="flex justify-between mt-2">
              <div className="flex gap-2 items-center">
                <img src={starIconSVG} alt="" />
                <span className="text-gray-400">Puntaje:</span>
              </div>
              <span>{score}</span>
            </li>
          </ul>
          <button className="self-end">
            <button className="text-customRed-400 font-bold">Quitar</button>
          </button>
        </div>
      </div>
    </button>
  );
}
