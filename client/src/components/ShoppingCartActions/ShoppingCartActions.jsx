import { useDispatch, useSelector } from "react-redux";
import useDeleteAllCart from "../../utils/hooks/useDeleteAllCart";
import MainButton from "../Buttons/MainButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import { useEffect } from "react";
import { totalPayOrder } from "../../state/store/slices/tableOrder/orderSlice";
import patchCallWaiter from "../../utils/api/patchCallWaiter";
import { useParams } from "react-router-dom";
import useFireBase from "../../utils/hooks/useFireBase";
import { makeOrder } from "../../utils/api/makeOrder";

function ShoppingCartActions() {
    const { table } = useParams();

    const [tables, setTables] = useFireBase("/tables", {});

    const waiterUsername = table && tables[`table_${table}`]?.waiter;

    //Eliminar todos los pedidos en caso de los comensales no quieran comer mas en el Restaurant
    const handlerDeleteAllCart = useDeleteAllCart();

    const dispatch = useDispatch();
    const totalPay = useSelector((state) => state.order.totalPay);
    const ordersOfTable = useSelector((state) => state.order.ordersOfTable);

    useEffect(() => {
        dispatch(totalPayOrder());
        return () => {};
    }, [dispatch, ordersOfTable]);

    const handleMakeOrder = async (event) => {
        console.log(ordersOfTable);
        const order = [];
        ordersOfTable.forEach((item) => {
            for (let index = 0; index < item.quantity; index++) {
                order.push(item.productId._id);
            }
        });
        console.log(order);

        const response = await makeOrder(table, order);

        console.log(response);
    };

    return (
        <div className="w-[95vw] flex flex-wrap gap-y-8 gap-x-2 place-content-center self-center">
            <p className="w-full text-[32px] leading-10">
                Total a pagar: <span className="font-bold">${totalPay}</span>
            </p>
            <SecondaryButton
                onClick={() => patchCallWaiter(table, waiterUsername)}
                children="Llamar al Mozo"
                classNameSize="h-10 items-center w-1/2"
            />
            <MainButton
                children="¡ Pedir !"
                classNameSize="h-10 items-center grow"
                onClick={handleMakeOrder}
            />
        </div>
    );
}

export default ShoppingCartActions;
