export const handlePending = (state) => {
	state.status = 'loading'
}

export const handleCreateOrderFulfilled = (state, action) => {
	state.status = 'succeeded'
	state.orders.push(action.payload)
	state.error = null
}

export const handleUpdateOrderFulfilled = (state, action) => {
	state.status = 'succeeded'
	const index = state.orders.findIndex(
		(order) => order.id === action.payload.id,
	)
	if (index !== -1) {
		state.orders[index] = action.payload
	}
	state.error = null
}

export const handleRemoveOrderFulfilled = (state, action) => {
	state.status = 'succeeded'
	state.orders = state.orders.filter((order) => order.id !== action.payload.id)
	state.error = null
}

export const handlePayOrderFulfilled = (state, action) => {
	state.status = 'succeeded'
	const index = state.orders.findIndex(
		(order) => order.id === action.payload.id,
	)
	if (index !== -1) {
		state.orders[index].paid = true
	}
	state.error = null
}

export const handleGetOrderFulfilled = (state, action) => {
	state.status = 'succeeded'
	state.orders.push(action.payload)
	state.error = null
}

export const handleRejected = (state, action) => {
	state.status = 'failed'
	state.error = action.payload || action.error.message
}
