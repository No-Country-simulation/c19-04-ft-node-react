import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userAuthReducer from "./slices/auth/userSlice";
import orderTableReducer from "./slices/tableOrder/orderSlice";
import searchReducer from "./slices/searchValue/searchSlice";
import menusReducer from "./slices/dataMenu/dataMenuSlice";
import callWaitersReducer from "./slices/callWaiter/callWaiterSlice";
import allWaitersReducer from "./slices/allWaiters/allWaitersSlice";

const rootReducer = combineReducers({
    user: userAuthReducer,
    order: orderTableReducer,
    search: searchReducer,
    dataMenus: menusReducer,
    callWaiters: callWaitersReducer,
    allWaiters: allWaitersReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export default store;
