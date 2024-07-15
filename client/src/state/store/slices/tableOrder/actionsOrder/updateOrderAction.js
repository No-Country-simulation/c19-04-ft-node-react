import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../../../utils/api/axiosInstance'

export const updateOrderTable = createAsyncThunk(
	'tableOrder/updateOrderTable',
	async ({ orderId, updatedOrderData }, thunkAPI) => {
		try {
			const response = await axiosInstance.put(
				`/tableOrder/${orderId}`,
				updatedOrderData,
			)
			if (!response.ok) {
				const errorData = await response.json()
				return thunkAPI.rejectWithValue(errorData)
			}

			const updatedOrder = await response.json()
			return updatedOrder
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message)
		}
	},
)
