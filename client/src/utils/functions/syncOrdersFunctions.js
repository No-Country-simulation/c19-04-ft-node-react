export function addOrder(state, action) {
  const existingOrder = state.ordersOfTable.find(
    (order) => order.productId === action.payload
  );
  if (existingOrder) {
    existingOrder.quantity += 1;
  } else {
    state.ordersOfTable.push({ productId: action.payload, quantity: 1 });
  }
}

export function removeOrder(state, action) {
  const existingOrder = state.ordersOfTable.find(
    (order) => order.productId === action.payload
  );
  if (existingOrder) {
    if (existingOrder.quantity > 1) {
      existingOrder.quantity -= 1;
    } else {
      state.ordersOfTable = state.ordersOfTable.filter(
        (order) => order.productId !== action.payload
      );
    }
  }
}

export function deleteOrder(state, action) {
  const existingOrder = state.ordersOfTable.find(
    (order) => order.productId === action.payload
  );
  if (existingOrder) {
    state.ordersOfTable = state.ordersOfTable.filter(
      (order) => order.productId !== action.payload
    );
  }
}

export function updateOrder (state, action) {
    const { orderId, orderUpdate } = action.payload;
    const existingOrder = state.ordersOfTable.find((order) => order.id === orderId);
    if (existingOrder) {
      existingOrder.status = orderUpdate.status;
    } else {
      state.error = "Order not found";
    }
  }