import mongoose from 'mongoose'
import regexpValidators from '../utils/regexpValidators.js'

const waiterSchema = new mongoose.Schema({
	username: {
		type: String,
		validate: {
			validator: (userName) => regexpValidators.USERNAMEREGEXP.test(userName),
			message: (invalidUsername) =>
				`${invalidUsername.value} no es un usuario valido!`,
		},
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
