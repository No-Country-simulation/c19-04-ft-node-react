import { createSlice } from "@reduxjs/toolkit";
import { asyncOrderHandlers } from "./asyncHandlers";

const initialState = {
  orders: [],
  status: "idle",
  error: null,
};

export const orderTableSlice = createSlice({
  name: "orderTable",
  initialState,
  reducers: {
    addOrderLocally: (state, action) => {
      state.orders.push(action.payload);
    },
    removeOrderLocally: (state, action) => {
      state.orders = state.orders.filter(order => order.id !== action.payload.orderId);
    },
    updateOrderLocally: (state, action) => {
      const { orderId, orderUpdate } = action.payload;
      const existingOrder = state.orders.find(order => order.id === orderId);
      if (existingOrder) {
        existingOrder.status = orderUpdate.status;
      } else {
        state.error = 'Order not found';
      }
    },
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

export const { addOrderLocally, removeOrderLocally, updateOrderLocally } = orderTableSlice.actions;
export default orderTableSlice.reducer;
