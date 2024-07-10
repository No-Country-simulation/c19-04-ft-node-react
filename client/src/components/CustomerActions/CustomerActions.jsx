import React from "react";
import { callWaiter, showMenu } from "../../utils/functions/customerActions";
import NavBar from "../NavBar/NavBar";

const CustomerActions = () => {
  return (
    <div className="flex flex-col items-center justify-around min-h-screen bg-customLight">
    <NavBar bgMain={"bg-customLight"}/>
      <h2 className="text-4xl font-bold m-10">Bienvenidos</h2>
      <div className="flex flex-col grow gap-[10px] text-2xl leading-7 font-bold  min-w-[369px] md:min-w-[419px] md:justify-center lg:min-w-[469px]">
        <button className="bg-customBlue p-[10px] rounded-[20px] h-[55px] text-white  my-4 w-full" onClick={showMenu}>CONSULTAR MENÚ</button>
        <button className="bg-customBlue p-[10px]  rounded-[20px] h-[55px] text-white w-full" onClick={callWaiter}>LLAMAR AL MOZO</button>
        <button className="bg-customBlue p-[10px]  rounded-[20px] h-[55px] text-white my-4 w-full" onClick={showMenu}>RESERVAS</button>
      </div>
      
    </div>
  )
}

export default CustomerActions;