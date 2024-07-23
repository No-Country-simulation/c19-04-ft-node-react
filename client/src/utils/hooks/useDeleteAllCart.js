import { useDispatch } from "react-redux";
import { deleteAllOrderLocally } from "../../state/store/slices/tableOrder/orderSlice";

export default function useDeleteAllCart() {
  const dispatch = useDispatch();

  function handlerDeleteAllCart() {
    dispatch(deleteAllOrderLocally());
  }

  return handlerDeleteAllCart;
}
