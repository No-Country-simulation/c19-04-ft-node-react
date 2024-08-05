export function addOrder(state, action) {
  const existingOrder = state.ordersOfTable.find(
    (order) => order.productId._id === action.payload._id
  );
  if (existingOrder) {
    existingOrder.quantity += 1;
  } else {
    state.ordersOfTable.push({ productId: action.payload, quantity: 1 });
  }
}

export function removeOrder(state, action) {
  const existingOrder = state.ordersOfTable.find(
    (order) => order.productId._id === action.payload._id
  );
  if (existingOrder) {
    if (existingOrder.quantity > 1) {
      existingOrder.quantity -= 1;
    } else {
      state.ordersOfTable = state.ordersOfTable.filter(
        (order) => order.productId._id !== action.payload._id
      );
    }
  }
}

export function deleteOrder(state, action) {
  const existingOrder = state.ordersOfTable.find(
    (order) => order.productId._id === action.payload._id
  );
  if (existingOrder) {
    state.ordersOfTable = state.ordersOfTable.filter(
      (order) => order.productId._id !== action.payload._id
    );
  }
}

export function deleteAllOrders(state) {
  if (state.ordersOfTable && state.ordersOfTable.length > 0) {
    state.ordersOfTable = [];
    state.error = null;
  } else {
    state.error = "No tienes ninguna orden hecha";
  }
}

export function totalPayProduct(state) {
  let valueToPay = state.ordersOfTable.reduce((total, order) => {
   return total += order.quantity * order.productId.price;
  }, 0);
  state.totalPay = valueToPay;
}
