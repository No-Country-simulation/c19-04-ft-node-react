export const extractCategories = function (menus) {
    const categories = Array.from(new Set(menus.map((item) => item.category)));

    categories.unshift("Todo");

    return categories;
};
