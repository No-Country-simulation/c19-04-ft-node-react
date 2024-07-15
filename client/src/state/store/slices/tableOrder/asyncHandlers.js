import { createOrderTable } from './actionsOrder/createOrderAction'
import { updateOrderTable } from './actionsOrder/updateOrderAction'
import { removeOrderTable } from './actionsOrder/removeOrderAction'
import { payOrderTable } from './actionsOrder/payOrderAction'
import { getOrderTable } from './actionsOrder/tableOrderAction'
import {
	handlePending,
	handleCreateOrderFulfilled,
	handleUpdateOrderFulfilled,
	handleRemoveOrderFulfilled,
	handlePayOrderFulfilled,
	handleGetOrderFulfilled,
	handleRejected,
} from '../../../../utils/functions/sliceOrdersHelpers'

export const asyncOrderHandlers = {
	[createOrderTable.pending]: handlePending,
	[createOrderTable.fulfilled]: handleCreateOrderFulfilled,
	[createOrderTable.rejected]: handleRejected,

	[updateOrderTable.pending]: handlePending,
	[updateOrderTable.fulfilled]: handleUpdateOrderFulfilled,
	[updateOrderTable.rejected]: handleRejected,

	[removeOrderTable.pending]: handlePending,
	[removeOrderTable.fulfilled]: handleRemoveOrderFulfilled,
	[removeOrderTable.rejected]: handleRejected,

	[payOrderTable.pending]: handlePending,
	[payOrderTable.fulfilled]: handlePayOrderFulfilled,
	[payOrderTable.rejected]: handleRejected,

	[getOrderTable.pending]: handlePending,
	[getOrderTable.fulfilled]: handleGetOrderFulfilled,
	[getOrderTable.rejected]: handleRejected,
}
