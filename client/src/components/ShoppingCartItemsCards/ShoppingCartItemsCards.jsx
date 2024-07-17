import React, { useState } from "react";
import QuantityButton from "../QuantityButton/QuantityButton";
import useCartAction from "../../utils/hooks/useCartAction";
import { totalPayProduct } from "../../utils/functions/totalProduct";
import arrowTop from "../../assets/images/flecha-hacia-arriba.png";
import arrowBottom from "../../assets/images/flecha-hacia-abajo.png";

function ShoppingCartItemsCards({ _id, name, price, img }) {
  const { handleDeleteProduct } = useCartAction();
  const priceTotalProduct = totalPayProduct(_id);

  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full max-w-[90%] mx-auto my-4 bg-customLight rounded-[20px] shadow-lg shadow-gray-500 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center md:justify-center">
        <div className="relative w-full h-[200px] md:w-[200px] md:h-[200px]">
          <img
            className="absolute w-full h-full object-cover rounded-t-[20px] md:rounded-t-none md:rounded-l-[20px] border-b-2 border-customLight md:border-none"
            src={img}
            alt={name}
          />
        </div>
        <div className="flex flex-col p-4 w-full md:py-0">
          <h4 className="text-lg font-bold text-center md:text-left text-customDark mb-2">{name}</h4>
          <button
            className="text-base font-semibold text-customBlue flex items-center justify-between w-full text-left mb-4"
            onClick={toggleAccordion}
          >
            <span>{isOpen ? "Cerrar detalles" : "Ver detalles"}</span>
            <img
              src={isOpen ? arrowTop : arrowBottom}
              alt={isOpen ? "Cerrar detalles" : "Ver detalles"}
              className="w-5 h-5 ml-2"
            />
          </button>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="flex flex-col gap-4">
              <div className="text-base text-customGreen font-semibold text-center md:text-left">
                <p>Precio: {price}</p>
                <p>Total por producto: ${priceTotalProduct}</p>
              </div>
              <div className="flex flex-row gap-4 justify-center items-center">
                <button
                  className="bg-customLight rounded-[20px] h-11 text-customRed border-2 border-customRed w-full md:w-[180px] flex items-center justify-center transition duration-150 ease-in-out transform hover:scale-100"
                  onClick={() => handleDeleteProduct({ _id })}
                >
                  Eliminar artículo
                </button>
                <div className="flex justify-center md:mt-0 w-full md:w-auto">
                  <QuantityButton productId={{ _id, name }} className="h-[35px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartItemsCards;
