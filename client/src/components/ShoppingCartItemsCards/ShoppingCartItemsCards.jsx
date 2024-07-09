import React from "react";

function ShoppingCartItemsCards({ name, price, img }) {
  return (
    <div className="flex flex-col w-52 border-solid border-2 border-red-500">
      <h3>{name}</h3>
      <h4>{price}</h4>
      <img src={img} alt="name" />
    </div>
  );
}

export default ShoppingCartItemsCards;
