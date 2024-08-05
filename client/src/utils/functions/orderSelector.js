import { useSelector } from "react-redux";

export const orderSelectorQuantity = (productId) =>
  useSelector((state) =>
    state.order.ordersOfTable.find(
      (order) => order.productId._id === productId._id
    )
  );

export const orderStateSelector = (_id) =>
  useSelector((state) =>
    state.order.ordersOfTable.find((order) => order.productId._id === _id)
  );
