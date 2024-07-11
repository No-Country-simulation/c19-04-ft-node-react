import { useSelector } from "react-redux";

export const orderSelectorQuantity = (productId) =>
  useSelector((state) =>
    state.order.ordersOfTable.find((order) => order.productId === productId)
  );
