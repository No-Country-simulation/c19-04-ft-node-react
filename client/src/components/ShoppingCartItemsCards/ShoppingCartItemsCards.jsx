import React from "react";
import QuantityButton from "../QuantityButton/QuantityButton";
import useCartAction from "../../utils/hooks/useCartAction";

function ShoppingCartItemsCards({ name, price, img }) {

  const { handleDecrement,handleIncrement, handleDeleteProduct} = useCartAction()
  return (
    <div className="grid grid-cols-1 my-1 md:grid-cols-[220px_minmax(900px,_1fr)] w-full bg-customLight rounded-[30px] gap-3">
      <img
        className="aspect-video w-full object-contain"
        src={img}
        alt="name"
      />
      <div className="flex flex-col grid-rows-3 gap-3">
        <h4 className="text-2xl font-bold mx-2">{name}</h4>
        <h4 className="text-2xl text-customGreen font-bold mx-2">{price}</h4>
        <div className="flex gap-4 justify-center md:justify-start">
          <button
            className="bg-customLight rounded-[20px] h-[45px] text-customRed border-2 border-customRed w-[150px]"
            onClick={() => {handleDeleteProduct(name)}}
          >
            Eliminar articulo
          </button>
          <QuantityButton productId={name}/>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartItemsCards;
