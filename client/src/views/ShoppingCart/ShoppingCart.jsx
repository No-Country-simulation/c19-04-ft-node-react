import React from "react";
import ShoppingCartItemsContainer from "../../components/ShoppingCartItemsContainer/ShoppingCartItemsContainer";
import ShoppingCartActions from "../../components/ShoppingCartActions/ShoppingCartActions";
import NavBar from "../../components/NavBar/NavBar";

function ShoppingCart() {
  return (
    <div className="relative flex flex-col bg-customBlue py-5 bg-customBgMain min-h-dvh">
      <NavBar  />
      <h2 className="leading-5 font-medium text-customGray-950 mx-5 my-2  py-2 ">
        Mi Pedido
      </h2>
      <ShoppingCartItemsContainer />
      <ShoppingCartActions />
    </div>
  );
}

export default ShoppingCart;
