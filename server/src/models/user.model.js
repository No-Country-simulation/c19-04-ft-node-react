import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import regexpValidators from '../utils/regexpValidators.js'

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		validate: {
			validator: (username) => regexpValidators.USERNAMEREGEXP.test(username),
			message: (invalidUser) => `${invalidUser.value} no es un usuario valido!`,
		},
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ['admin', 'kitchen', 'waiter', 'table'],
		default: 'table',
	},
})

userSchema.statics.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10)
	return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
	return await bcrypt.compare(password, receivedPassword)
}

const UserModel = mongoose.model('User', userSchema)

export default UserModel
