import React from "react";
import ShoppingCartItemsContainer from "../../components/ShoppingCartItemsContainer/ShoppingCartItemsContainer";
import ShoppingCartActions from "../../components/ShoppingCartActions/ShoppingCartActions";
import NavBar from "../../components/NavBar/NavBar";

function ShoppingCart() {
  return (
    <div className="flex flex-col min-h-screen bg-customBlue bg-customBgMain">
      <NavBar />
      <h2 className="leading-5 font-normal text-customGray-950 mx-3  py-2 ">
        Mi Pedido
      </h2>
      <ShoppingCartItemsContainer />
      <ShoppingCartActions />
    </div>
  );
}

export default ShoppingCart;
