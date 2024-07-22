import { useDispatch, useSelector } from "react-redux";
import useDeleteAllCart from "../../utils/hooks/useDeleteAllCart";
import MainButton from "../Buttons/MainButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import { useEffect } from "react";


function ShoppingCartActions() {
  

  //Eliminar todos los pedidos en caso de los comensales no quieran comer mas en el Restaurant
  const handlerDeleteAllCart = useDeleteAllCart()
 
  const totalPay = useSelector(state => state.order.totalPay) 
  const dispatch = useDispatch()
  
  useEffect(()=>{
    //dispatch(totalPayOrder)
    return ()=>{}
  }, [totalPay])

  return (
    <div className="w-[95vw] grid grid-cols-2 gap-2 place-content-center self-center">
      //total a pagar : ${totalPay} 
      <SecondaryButton children="Llamar al Mozo"  classNameSize="h-10 items-center grow"/>
      <MainButton children="¡ Pedir !" classNameSize="h-10 items-center grow" />

    </div>
  );
}

export default ShoppingCartActions;
