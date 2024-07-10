import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstace from "../../../../../utils/api/axiosInstance";

export const loginAction = createAsyncThunk(
  "user/loginUser",
  async (userId, thunkAPI) => {
    try {
      const response = await axiosInstace.get(`/user/${userId}`);
      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
