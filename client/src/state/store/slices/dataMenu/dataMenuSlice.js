import { createSlice } from "@reduxjs/toolkit";
import { dataMenuGet } from "./actionsDataMenu/dataMenuGetAction";
import { extractCategories } from "../../../../utils/functions/extractCategories";
import { applyFiltersToMenu } from "../../../../utils/functions/applyFilters";

const dataMenuSlice = createSlice({
    name: "dataMenu",
    initialState: {
        menus: [],
        filteredMenus: [],
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {
        applyFilters: (state, action) => {
            state.filteredMenus = applyFiltersToMenu(
                state.menus,
                action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(dataMenuGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(dataMenuGet.fulfilled, (state, action) => {
                state.menus = action.payload;
                state.filteredMenus = action.payload;
                state.categories = extractCategories(action.payload);
                state.loading = false
            })
            .addCase(dataMenuGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error desconocido";
            });
    },
});

export const { applyFilters } = dataMenuSlice.actions;

export default dataMenuSlice.reducer;
