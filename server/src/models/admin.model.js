import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
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
