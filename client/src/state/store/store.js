import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userAuthReducer from "./slices/auth/userSlice";
import  orderTableReducer from "./slices/tableOrder/orderSlice";
import searchReducer from "./slices/searchValue/searchSlice";

const rootReducer = combineReducers({
  user: userAuthReducer,
  order: orderTableReducer,
  search: searchReducer
});

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
