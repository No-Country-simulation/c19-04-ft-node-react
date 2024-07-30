import { createSlice } from "@reduxjs/toolkit";
import { getAllUsersAction } from "./actionUsers/getAllUsersAction";

const usersSlice = createSlice({
    name: "allUsers",
    initialState: {
        allUsers: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsersAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsersAction.fulfilled, (state, action) => {
                state.loading = false;
                state.allUsers = action.payload;
            })
            .addCase(getAllUsersAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error desconocido";
            });
    },
});

export default usersSlice.reducer;
