import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../../../utils/api/axiosInstance'

export const payOrderTable = createAsyncThunk(
	'tableOrder/payOrderTable',
	async (orderId, thunkAPI) => {
		try {
			const response = await axiosInstance.post(`/tableOrder/pay/${orderId}`)

			if (!response.ok) {
				const errorData = await response.json()
				return thunkAPI.rejectWithValue(errorData)
			}
			return orderId
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message)
		}
	},
)
