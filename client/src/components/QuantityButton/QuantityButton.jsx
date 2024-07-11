import React from "react";
import useCartAction from "../../utils/hooks/useCartAction";
import { orderSelectorQuantity } from "../../utils/functions/orderSelector";


function QuantityButton({ productId }) {

  const { handleDecrement, handleIncrement } = useCartAction()
  const order = orderSelectorQuantity(productId)
  const productCount = order ? order.quantity : 0


  return (
    <div className="rounded-[450px] h-[45px] bg-gray-400">
      <button className="rounded-[450px] h-[45px] w-[45px] text-xl bg-gray-400 border border-customLight" onClick={() => { handleDecrement(productId) }}>
        -
      </button>
      <span className="mx-4 text-xl">{productCount}</span>
      <button className="rounded-[450px] h-[45px] w-[45px] text-customLight text-xl bg-customBlue" onClick={() => { handleIncrement(productId) }}>
        +
      </button>
    </div>
  );
}

export default QuantityButton;
