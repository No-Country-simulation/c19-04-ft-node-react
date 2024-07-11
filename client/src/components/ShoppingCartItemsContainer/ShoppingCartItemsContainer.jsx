import React from "react";
import ShoppingCartItemsCards from "../ShoppingCartItemsCards/ShoppingCartItemsCards";

function ShoppingCartItemsContainer() {
  const DEMO_ITEMS = [
    {
      id: 1,
      name: "hamburguesa",
      price: "$1.000",
      img: "https://media.istockphoto.com/id/520410807/es/foto/hamburguesa-con-queso.jpg?s=612x612&w=0&k=20&c=YDYCsfNMOHATJlvcswo7mjebVeLOtctrQeUPJGlR3jc=",
    },
    {
      id: 2,
      name: "hot dog",
      price: "$800",
      img: "https://static.vecteezy.com/system/resources/thumbnails/026/415/467/small_2x/hot-dog-isolated-photo.jpg",
    },
    {
      id: 3,
      name: "pizza",
      price: "$1.200",
      img: "https://media.istockphoto.com/id/496546118/es/foto/retrato-de-la-cocina-cl%C3%A1sica-italiana-original-de-pizza-de-chorizo-aislado.jpg?s=612x612&w=0&k=20&c=9SYXuSH1-UObbKJuFnzJ2ul02OvZ_cww2KM98hA2Wrg=",
    },
  ];

  return (
    <div className="flex flex-col w-full mb-auto">
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
