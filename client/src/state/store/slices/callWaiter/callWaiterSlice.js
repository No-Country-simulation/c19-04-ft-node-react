import { createSlice } from "@reduxjs/toolkit";
import { getCallsToWaiters } from "./actionWaiter/getCallsToWaiter";

const waiterSlice = createSlice({
    name: "waiterCalls",
    initialState: {
        tables: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCallsToWaiters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCallsToWaiters.fulfilled, (state, action) => {
                state.loading = false;
                state.tables = action.payload;
            })
            .addCase(getCallsToWaiters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error desconocido";
            });
    },
});

export default waiterSlice.reducer;
