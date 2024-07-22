import React from "react";
import ShoppingCartItemsContainer from "../../components/ShoppingCartItemsContainer/ShoppingCartItemsContainer";
import ShoppingCartActions from "../../components/ShoppingCartActions/ShoppingCartActions";
import NavBar from "../../components/NavBar/NavBar";

function ShoppingCart() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-customBlue">
      <NavBar />
      <h2 className="text-4xl font-bold text-white  px-4 text-center  rounded-lg py-3 ">
        Detalles de Orden
      </h2>
      <ShoppingCartItemsContainer />
      <ShoppingCartActions />
    </div>
  );
}

export default ShoppingCart;
