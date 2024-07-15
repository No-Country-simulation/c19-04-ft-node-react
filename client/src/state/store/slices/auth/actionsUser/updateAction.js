import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstace from '../../../../../utils/api/axiosInstance'

export const updateUser = createAsyncThunk(
	'user/updateUser',
	async (userData, thunkAPI) => {
		try {
			const response = await axiosInstace.put(`/users/${userData.id}`, userData)

			if (!response.ok) {
				const errorData = await response.json()
				return thunkAPI.rejectWithValue(errorData)
			}

			const data = await response.json()
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message)
		}
	},
)
