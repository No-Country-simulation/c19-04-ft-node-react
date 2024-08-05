export const extractCategories = function (menus) {
    const categories = Array.from(
        new Set(menus.map((item) => item.category[0]))
    );

    categories.unshift("Todo");

    return categories;
};
