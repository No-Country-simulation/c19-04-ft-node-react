import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstanceWithCredentials from "../../../../../utils/api/axiosInstanceWithCredentials";

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstanceWithCredentials.get(`api/admin/user`);
      if (response.status !== 200) {
        return thunkAPI.rejectWithValue("Inicia sesion");
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
