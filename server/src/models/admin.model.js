import mongoose from 'mongoose'
import regexpValidators from '../utils/regexpValidators.js'

const adminSchema = new mongoose.Schema({
	username: {
		type: String,
		validate: {
			validator: (userName) => regexpValidators.USERNAMEREGEXP.test(userName),
			message: (invalidUsername) =>
				`${invalidUsername.value} is not a valid username!`,
		},
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: 'admin',
	},
})

const AdminModel = mongoose.model('Admin', adminSchema)

export default AdminModel
