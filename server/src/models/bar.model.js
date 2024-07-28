import mongoose from 'mongoose'

const barSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	branch: {
		type: Number,
		default: 0,
	},
	role: {
		type: String,
		default: 'bar',
	},
})

const BarModel = mongoose.model('Bar', barSchema)

export default BarModel
