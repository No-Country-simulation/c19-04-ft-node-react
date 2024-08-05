import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstanceWithCredentials from "../../../../../utils/api/axiosInstanceWithCredentials";

export const loginAction = createAsyncThunk(
    "user/loginUser",
    async (loginInfo, thunkAPI) => {
        console.log(loginInfo);
        try {
            const response = await axiosInstanceWithCredentials.post(
                "api/auth/login",
                loginInfo
            );
            if (response.status !== 200) {
                // const errorData = await response.json();
                return thunkAPI.rejectWithValue("No se inició sesión");
            }
            return loginInfo;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
