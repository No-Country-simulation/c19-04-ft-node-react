import { createSlice } from "@reduxjs/toolkit";
import { dataMenuGet } from "./actionsDataMenu/dataMenuGetAction";

const dataMenuSlice = createSlice({
    name: "dataMenu",
    initialState: {
        menus: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(dataMenuGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(dataMenuGet.fulfilled, (state, action) => {
                state.loading = false;
                state.menus = action.payload;
            })
            .addCase(dataMenuGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error desconocido';
            });
    }
});

export default dataMenuSlice.reducer;
