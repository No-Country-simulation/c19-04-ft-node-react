import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        searchValue: "",
        categoryFilter: "Todo",
    },
    reducers: {
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
        setCategoryFilter: (state, action) => {
            state.categoryFilter = action.payload;
        },
    },
});
export const { setSearchValue, setCategoryFilter } = searchSlice.actions;

export default searchSlice.reducer;
