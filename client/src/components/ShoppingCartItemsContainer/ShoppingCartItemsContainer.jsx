import React from "react";
import ShoppingCartItemsCards from "../ShoppingCartItemsCards/ShoppingCartItemsCards";
import { useSelector } from "react-redux";

function ShoppingCartItemsContainer() {
  
  const arrayPedidos = useSelector((state)=> state.order.ordersOfTable)

  return (
    <div className="flex flex-col w-full mb-20 gap-12">
      {arrayPedidos.map((item) => (
        <ShoppingCartItemsCards
          key={item.productId.title}
          _id= {item.productId.title}
          name={item.productId.title}
          price={item.productId.price}
          img={item.productId.img}
        />
      ))}
    </div>
  );
}

export default ShoppingCartItemsContainer;
