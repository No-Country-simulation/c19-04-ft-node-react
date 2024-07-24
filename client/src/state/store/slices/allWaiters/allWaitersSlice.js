import { createSlice } from "@reduxjs/toolkit";
import { allWaitersGet } from "./actionsAllWaiters/actionsAllWaiters";

const allWaitersSlice = createSlice({
    name: "allWaiters",
    initialState: {
        waiters: [],
        loading: false,
        error: null,
    },
    reducers: {
        emptyWaiters: (state, action) => {
            state.waiters = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(allWaitersGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(allWaitersGet.fulfilled, (state, action) => {
                state.loading = false;
                state.waiters = action.payload;
            })
            .addCase(allWaitersGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error desconocido";
            });
    },
});

export const { emptyWaiters } = allWaitersSlice.actions;

export default allWaitersSlice.reducer;
