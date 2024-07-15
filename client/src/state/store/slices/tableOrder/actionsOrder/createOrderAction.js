import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstace from '../../../../../utils/api/axiosInstance'

export const createOrderTable = createAsyncThunk(
	'tableOrder/createOrderTable',
	async (orderId, thunkAPI) => {
		try {
			const response = await axiosInstace.get(`/table/${orderId}`)
			if (!response.ok) {
				const errorData = await response.json()
				return thunkAPI.rejectWithValue(errorData)
			}
			const data = await response.json()
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(errorData)
		}
	},
)
