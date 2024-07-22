import React from "react";
import { useSelector } from "react-redux";
import DropdownFoodItem from "../Dropdown/DropdownFoodItem";

function ShoppingCartItemsContainer() {

  const ordersUser = useSelector((state) => state.order.ordersOfTable)

  return (
    <div className="flex flex-col items-center w-full mb-10 gap-2 grow">
      {ordersUser.map((item, index) => (<DropdownFoodItem food={item} key={index} />))}
    </div>
  );
}

export default ShoppingCartItemsContainer;
