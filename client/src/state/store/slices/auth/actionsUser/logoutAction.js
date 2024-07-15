import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../../../utils/api/axiosInstance'

export const logoutUser = createAsyncThunk(
	'user/logoutUser',
	async (userId, thunkAPI) => {
		try {
			const response = await axiosInstance.post(`/logout/${userId}`)

			if (!response.ok) {
				const errorData = await response.json()
				return thunkAPI.rejectWithValue(errorData)
			}
			const data = response.json()
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message)
		}
	},
)
