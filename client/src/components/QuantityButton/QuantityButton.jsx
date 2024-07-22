import React from "react";
import useCartAction from "../../utils/hooks/useCartAction";
import { orderSelectorQuantity } from "../../utils/functions/orderSelector";
import PlusButton from "../Buttons/PlusButton";
import MinButton from "../Buttons/MinButton";


function QuantityButton({ productId }) {

  const { handleDecrement, handleIncrement } = useCartAction()
  const quantity = orderSelectorQuantity(productId)?.quantity ?? 0
  return (
    <div className="flex items-center rounded-[45px]">
      <MinButton classNameIcon="w-3" onClick={() => { handleDecrement(productId) }} />
      <span className="mx-4 ">{quantity}</span>
      <PlusButton classNameIcon="w-3" onClick={() => { handleIncrement(productId) }} />
    </div>
  );
}

export default QuantityButton;
