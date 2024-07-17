export const createCartItemObject = (title, extraInfo, price, img) => ({
    _id: title,
    title: title,
    description: extraInfo,
    price: price,
    img: img,
});

