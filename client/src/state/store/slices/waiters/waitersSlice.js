import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  infoWaiter:{
    name: "",
  },
  orders: [],
  tables: [],
  error: null,
}


export const waitersSlice = createSlice({
  name: "waiter",
  initialState,
  reducers: {
    setInfoWaiter: (state, action) => {
      state.infoWaiter.name = action.payload
    },
    setOrders: (state, action) => {
      state.orders.push(action.payload)
    }
  }
})

export const {
  setInfoWaiter, setOrders
} = waitersSlice.actions;

export default waitersSlice.reducer
