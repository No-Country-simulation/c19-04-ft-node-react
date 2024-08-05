import mongoose from 'mongoose'

const menuSchema = new mongoose.Schema({
	dishNumber: {
		type: Number,
		required: true,
		unique: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	to: {
		type: String,
		required: true,
	},
	category: {
		type: [String],
		required: true,
	},
	tags: {
		type: [String],
		required: true,
	},
	imgUrl: {
		type: String,
		required: true,
	},
	ingredients: {
		type: [String],
		required: true,
	},
	estimatedTime: {
		type: Number,
	},
	people: {
		type: Number,
	},
	extraInfo: {
		type: String,
	},
	price: {
		type: Number,
		required: true,
	},
	available: {
		type: Boolean,
		default: false,
	},
	rating: {
		type: Number,
	},
})

const MenuModel = mongoose.model('Menu', menuSchema)

export default MenuModel
