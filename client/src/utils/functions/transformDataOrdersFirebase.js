export const transformDataOrdersFirebase = (ordersCategory) => {
    const result = [];

    Object.keys(ordersCategory).forEach((idOrder) => {
        const valueOrderID = ordersCategory[idOrder];

        valueOrderID.order.forEach((orderUnit) => {
            result.push({
                orderId: idOrder,
                title: orderUnit.title,
                price: orderUnit.price,
                orderNumber: valueOrderID.orderNumber,
                table: valueOrderID.tableNumber
            });
        });
    });

    return result;
};