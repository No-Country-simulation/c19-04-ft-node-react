export const applyFiltersToMenu = function (menus, filters) {
    let filteredMenus = menus.filter((item) => {
        if (filters.categoryFilter === "Todo") {
            return true;
        }
        return filters.categoryFilter
            ? item.category === filters.categoryFilter
            : true;
    });
    console.log(filters.searchValue);
    if (filters.searchValue) {
        filteredMenus = filteredMenus.filter((item) => {
            return item.title
                .toLowerCase()
                .includes(filters.searchValue.toLowerCase());
        });
    }

    return filteredMenus;
};
