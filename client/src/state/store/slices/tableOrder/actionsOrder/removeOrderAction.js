import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../../../utils/api/axiosInstance'

export const removeOrderTable = createAsyncThunk(
	'tableOrder/removeOrderTable',
	async (orderId, thunkAPI) => {
		try {
			const response = await axiosInstance.delete(`/tableOrder/${orderId}`)

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
