import React from "react";
import ShoppingCartItemsContainer from "../../components/ShoppingCartItemsContainer/ShoppingCartItemsContainer";
import ShoppingCartActions from "../../components/ShoppingCartActions/ShoppingCartActions";

function ShoppingCart() {
  return (
    <div>
      ShoppingCart
      <ShoppingCartItemsContainer />
      <ShoppingCartActions />
    </div>
  );
}

export default ShoppingCart;
