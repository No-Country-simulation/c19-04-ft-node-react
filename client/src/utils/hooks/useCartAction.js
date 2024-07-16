import { useDispatch } from "react-redux";
import { addOrderLocally, removeOrderLocally, deleteOrderLocally } from "../../state/store/slices/tableOrder/orderSlice";

const useCartAction = () => {

    const dispatch = useDispatch()

    const handleIncrement = (itemId) => {
        dispatch(addOrderLocally(itemId))
    }

    const handleDecrement = (itemId) => {
        dispatch(removeOrderLocally(itemId))
    }
    const handleDeleteProduct = (itemId) => {
        dispatch(deleteOrderLocally(itemId))
    }

    return {
        handleDecrement,handleIncrement, handleDeleteProduct
    }
}

export default useCartAction;