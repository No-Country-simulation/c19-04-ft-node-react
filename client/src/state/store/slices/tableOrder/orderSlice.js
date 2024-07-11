import { createSlice } from "@reduxjs/toolkit";
import { asyncOrderHandlers } from "./asyncHandlers";
import { addOrder, deleteOrder, removeOrder, updateOrder } from "../../../../utils/functions/syncOrdersFunctions";

const initialState = {
  ordersOfTable: [],
  status: "idle",
  error: null,
};

export const orderTableSlice = createSlice({
  name: "orderTable",
  initialState,
  reducers: {
    addOrderLocally: addOrder,
    removeOrderLocally: removeOrder,
    deleteOrderLocally: deleteOrder,
    updateOrderLocally: updateOrder,
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
  updateOrderLocally,
  deleteOrderLocally,
} = orderTableSlice.actions;
export default orderTableSlice.reducer;
