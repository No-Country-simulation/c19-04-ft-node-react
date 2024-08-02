import { useDispatch, useSelector } from "react-redux";
import useDeleteAllCart from "../../utils/hooks/useDeleteAllCart";
import MainButton from "../Buttons/MainButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import { useEffect, useState } from "react";
import { totalPayOrder } from "../../state/store/slices/tableOrder/orderSlice";
import PopupCartPostOrder from "../PopupCartPostOrder/PopupCartPostOrder";
import patchCallWaiter from "../../utils/api/patchCallWaiter";
import { useParams } from "react-router-dom";
import useFireBase from "../../utils/hooks/useFireBase";
import { makeOrder } from "../../utils/api/makeOrder";

function ShoppingCartActions({
    setPopupMessage,
    setShowSuccessPopup,
    setShowErrorPopup,
}) {
    //Eliminar todos los pedidos en caso de los comensales no quieran comer mas en el Restaurant
    const handlerDeleteAllCart = useDeleteAllCart();

    const ordersUser = useSelector((state) => state.order.ordersOfTable);

    const { table } = useParams();

    const [tables, setTables] = useFireBase("/tables", {});

    const waiterUsername = table && tables[`table_${table}`]?.waiter;

    const dispatch = useDispatch();
    const totalPay = useSelector((state) => state.order.totalPay);
    const ordersOfTable = useSelector((state) => state.order.ordersOfTable);

    const [buttonDisabled, setButtonDisabled] = useState(true);
    useEffect(() => {
        setButtonDisabled(!waiterUsername);
    }, [tables]);

    useEffect(() => {
        dispatch(totalPayOrder());
        return () => {};
    }, [dispatch, ordersOfTable]);

    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    //   return (
    //     <div className="w-[95vw] flex flex-wrap gap-y-8 gap-x-2 place-content-center self-center ">
    //       <p className="w-full text-[32px] leading-10">Total a pagar: <span className="font-bold">${totalPay}</span></p>
    //       <SecondaryButton children="Llamar al Mozo" classNameSize="h-10 items-center w-1/2" />
    //       <MainButton children="¡ Pedir !" classNameSize="h-10 items-center grow" onClick={handleOpenModal} />
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleMakeOrder = async (event) => {
        const order = [];
        ordersOfTable.forEach((item) => {
            for (let index = 0; index < item.quantity; index++) {
                order.push(item.productId._id);
            }
        });
        try {
            const response = await makeOrder(table, order);
            setShowSuccessPopup(true);
            setPopupMessage("Orden tomada con éxito");
            await delay(5000); // Espera 5 segundos
            setShowSuccessPopup(false);
        } catch (error) {
            setShowErrorPopup(true);
            setPopupMessage(
                "No se pudo completar la orden. Por favor llama un mesero"
            );
            await delay(5000); // Espera 5 segundos
            setShowErrorPopup(false);
        }
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
                disabled={buttonDisabled}
            />
            <MainButton
                children="¡ Pedir !"
                classNameSize="h-10 items-center grow"
                onClick={handleMakeOrder}
                disabled={!ordersUser?.length}
            />
            {modalOpen && (
                <PopupCartPostOrder
                    isOpen={modalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default ShoppingCartActions;
