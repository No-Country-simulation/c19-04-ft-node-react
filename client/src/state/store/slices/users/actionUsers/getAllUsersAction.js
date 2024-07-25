import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstanceWithCredentials from "../../../../../utils/api/axiosInstanceWithCredentials";

export const getAllUsersAction = createAsyncThunk(
    "allUsers/getAllUsersAction",
    async (role, thunkAPI) => {
        try {
            const response = await axiosInstanceWithCredentials.post(
                `api/admin/allUsers`,
                { role }
            );
            if (response.status !== 200) {
                // const errorData = await response.json();
                return thunkAPI.rejectWithValue("Inicia sesion");
            }
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
