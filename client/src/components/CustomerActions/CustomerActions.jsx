import React from "react";
import { callWaiter, showMenu } from "../../utils/functions/customerActions";

const CustomerActions = () => {
  return (
    <div className="flex flex-col items-center justify-around min-h-screen">
      <h2 className="text-xl font-bold m-10">Bienvenido</h2>
      <div className="flex flex-col items-center justify-center p-6">
        <button className="bg-amber-600 p-3 rounded-xl text-white w-40" onClick={callWaiter}>Llamar al mesero</button>
        <button className="bg-amber-600 p-3 rounded-xl text-white my-4 w-40" onClick={showMenu}>Mostrar el menú</button>
      </div>
      
    </div>
  )
}

export default CustomerActions;