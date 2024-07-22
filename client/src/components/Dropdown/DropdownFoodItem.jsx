import { useState } from "react";
import triangleIconSVG from "../../assets/svg/triangle-inverted.svg";
import dollarIconSVG from "../../assets/svg/currency-dollar.svg";
import clockIconSVG from "../../assets/svg/clock.svg";
import starIconSVG from "../../assets/svg/star.svg";
import QuantityButton from "../QuantityButton/QuantityButton";
import { totalPayProduct } from "../../utils/functions/totalProduct";
import useCartAction from "../../utils/hooks/useCartAction";
import TextButton from "../Buttons/TextButton";

export default function DropdownFoodItem({ food }) {
  const [isOpen, setIsOpen] = useState(false);
  const { _id, title, price, time, score } = food.productId;
  const { quantity } = food

  const { handleDeleteProduct } = useCartAction();
  const priceTotalProduct = totalPayProduct(_id);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="w-[390px]">
      <div
        className={`bg-white shadow-lg rounded-lg transition-[border-radius] p-3 ${isOpen ? "rounded-b-none duration-0" : "duration-1000"
          }`}
      >
        <div className="flex justify-between w-full ">
          <p >
            {title} ({quantity})
          </p>
          <button className="absolute left-[90%]" onClick={toggleDropdown}>
            <img
              src={triangleIconSVG}
              alt=""
              className={`w-3 h-3 transform transition-transform duration-500 ${isOpen ? "rotate-180" : ""
                } `}
            />
          </button>
        </div>
      </div>
      <div
        className={`rounded-b-lg transition-all duration-500 overflow-hidden ${isOpen ? "max-h-40 shadow-lg" : "max-h-0"
          }`}
      >
        <div className="bg-white text-sm flex flex-col px-4 pb-4 pt-1 space-y-2">
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
                <img src={dollarIconSVG} alt="" />
                <p className="text-gray-400">Total por producto:</p>
              </div>
              <span>${priceTotalProduct}</span>
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

          <div className="flex flex-row gap-4 justify-between items-center">
            <TextButton onClick={() => handleDeleteProduct({ _id })}>Eliminar Producto</TextButton>
            <div className="flex justify-center md:mt-0  md:w-auto">
              <QuantityButton productId={{ _id }} className="h-[35px]" />
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
