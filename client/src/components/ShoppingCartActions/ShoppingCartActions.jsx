import { useDispatch, useSelector } from "react-redux";
import useDeleteAllCart from "../../utils/hooks/useDeleteAllCart";
import MainButton from "../Buttons/MainButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import { useEffect } from "react";
import { totalPayOrder } from "../../state/store/slices/tableOrder/orderSlice";


function ShoppingCartActions() {


  //Eliminar todos los pedidos en caso de los comensales no quieran comer mas en el Restaurant
  const handlerDeleteAllCart = useDeleteAllCart()

  const dispatch = useDispatch()
  const totalPay = useSelector(state => state.order.totalPay)
  const ordersOfTable = useSelector(state => state.order.ordersOfTable)


  useEffect(() => {
    dispatch(totalPayOrder())
    return () => { }
  }, [dispatch, ordersOfTable])

  return (
    <div className="w-[95vw] flex flex-wrap gap-y-8 gap-x-2 place-content-center self-center">
      <p className="w-full text-[32px] leading-10">Total a pagar: <span className="font-bold">${totalPay}</span></p>
      <SecondaryButton children="Llamar al Mozo" classNameSize="h-10 items-center w-1/2" />
      <MainButton children="¡ Pedir !" classNameSize="h-10 items-center grow" />

    </div>
  );
}

export default ShoppingCartActions;
