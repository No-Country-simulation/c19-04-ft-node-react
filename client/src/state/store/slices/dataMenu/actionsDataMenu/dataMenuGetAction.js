import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstace from "../../../../../utils/api/axiosInstance";

export const dataMenuGet = createAsyncThunk(
    "dataMenu/setMenus",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstace.get("/api/menu");
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
