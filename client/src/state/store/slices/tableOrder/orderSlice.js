import { createSlice } from "@reduxjs/toolkit";
import { asyncOrderHandlers } from "./asyncHandlers";
import { addOrder, deleteOrder, removeOrder, deleteAllOrders, totalPayProduct } from "../../../../utils/functions/syncOrdersFunctions";

const initialState = {
  ordersOfTable: [],
  status: "idle",
  error: null,
  totalPay: 0,
};

export const orderTableSlice = createSlice({
  name: "orderTable",
  initialState,
  reducers: {
    addOrderLocally: addOrder,
    removeOrderLocally: removeOrder,
    deleteOrderLocally: deleteOrder,
    deleteAllOrderLocally: deleteAllOrders,
    totalPayOrder: totalPayProduct,
  },
  extraReducers: (builder) => {
    Object.keys(asyncOrderHandlers).forEach((actionType) => {
      builder.addCase(actionType, (state, action) => {
        if (actionType.endsWith("/pending")) {
          asyncOrderHandlers[actionType](state);
        } else {
          asyncOrderHandlers[actionType](state, action);
        }
      });
    });
  },
});

export const {
  addOrderLocally,
  removeOrderLocally,
  deleteAllOrderLocally,
  deleteOrderLocally,
  totalPayOrder,
} = orderTableSlice.actions;
export default orderTableSlice.reducer;