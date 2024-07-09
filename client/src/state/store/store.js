import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userAuthReducer from "./slices/auth/userSlice";

const rootReducer = combineReducers({
  user: userAuthReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
