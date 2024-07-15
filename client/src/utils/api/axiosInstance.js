import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL

const axiosInstace = axios.create({
	baseURL,
	header: {
		'Content-Type': 'application/json',
	},
})

export default axiosInstace
