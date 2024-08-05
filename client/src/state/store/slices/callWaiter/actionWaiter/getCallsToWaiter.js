import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstace from "../../../../../utils/api/axiosInstance";

export const getCallsToWaiters = createAsyncThunk(
    "waiterCalls/getCalls",
    async (waiterUsername, thunkAPI) => {
        try {
            console.log(waiterUsername);
            const response = await axiosInstace.get(
                `api/waiter/msgWaiter/${waiterUsername}`
            );
            if (response.status === 200) {
                return response.data;
            } else {
                return thunkAPI.rejectWithValue("No se pudo obtener los menús");
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
