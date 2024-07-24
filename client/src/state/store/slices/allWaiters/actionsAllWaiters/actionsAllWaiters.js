import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstanceWithCredentials from "../../../../../utils/api/axiosInstanceWithCredentials";

export const allWaitersGet = createAsyncThunk(
    "allWaiters/getAllWaiters",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstanceWithCredentials.get(
                "/api/admin/waiters"
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
