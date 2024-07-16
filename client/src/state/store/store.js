import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userAuthReducer from "./slices/auth/userSlice";
import  orderTableReducer from "./slices/tableOrder/orderSlice";

const rootReducer = combineReducers({
  user: userAuthReducer,
  order: orderTableReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
