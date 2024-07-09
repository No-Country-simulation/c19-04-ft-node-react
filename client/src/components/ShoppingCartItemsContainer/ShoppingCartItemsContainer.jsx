import React from "react";
import ShoppingCartItemsCards from "../ShoppingCartItemsCards/ShoppingCartItemsCards";

function ShoppingCartItemsContainer() {
  const DEMO_ITEMS = [
    {
      id: 1,
      name: "hamburguesa",
      price: 1000,
      img: "https://media.istockphoto.com/id/520410807/es/foto/hamburguesa-con-queso.jpg?s=612x612&w=0&k=20&c=YDYCsfNMOHATJlvcswo7mjebVeLOtctrQeUPJGlR3jc=",
    },
    {
      id: 2,
      name: "hot dog",
      price: 800,
      img: "https://static.vecteezy.com/system/resources/thumbnails/026/415/467/small_2x/hot-dog-isolated-photo.jpg",
    },
    {
      id: 3,
      name: "pizza",
      price: 1200,
      img: "https://st.depositphotos.com/1003814/5052/i/450/depositphotos_50523105-stock-photo-pizza-with-tomatoes.jpg",
    },
  ];

  return (
    <div className="flex">
      {DEMO_ITEMS.map((item) => (
        <ShoppingCartItemsCards
          key={item.id}
          name={item.name}
          price={item.price}
          img={item.img}
        />
      ))}
    </div>
  );
}

export default ShoppingCartItemsContainer;
