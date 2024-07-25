import mongoose from 'mongoose'

const waiterSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	hourSalary: {
		type: Number,
		default: 5,
	},
	tablesAssigned: {
		type: Object,
		default: [],
	},
	requestedBy: [],
	moneyEarned: {
		type: Number,
		default: 0,
	},
	role: {
		type: String,
		default: 'waiter',
	},
})

const WaiterModel = mongoose.model('Waiter', waiterSchema)

export default WaiterModel
