import useDeleteAllCart from "../../utils/hooks/useDeleteAllCart";

function ShoppingCartActions() {
  
  const handlerDeleteAllCart = useDeleteAllCart()


  return (
    <div className="w-[95vw] grid grid-cols-2 gap-2 items-center justify-items-center">
      <button
        className="bg-customLight w-[80%] p-[10px] rounded-[20px] h-[55px] text-customRed border-2 border-customRed my-4 md:w-2/3 hover:scale-105"
        onClick={() => handlerDeleteAllCart() }
      >
        Eliminar pedido
      </button>
      <button
        className="bg-white w-full p-[10px] rounded-[20px] h-[55px] border-none my-4  md:w-2/3 font-bold shadow-md transform transition duration-150 hover:scale-105"
        onClick={() => { }}
      >
        Confirmar orden
      </button>
    </div>
  );
}

export default ShoppingCartActions;
