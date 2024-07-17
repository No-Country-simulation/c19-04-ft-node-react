//Modelo de el menu
import mongoose from 'mongoose'

const menuSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	imgUrl: {
		type: String,
		required: true,
	},
	ingredients: [],
	estimatedTimeToDeliver: {
		type: Number,
	},
	price: {
		type: Number,
		required: true,
	},
	available: {
		type: Boolean,
		default: false,
	},
})

const MenuModel = mongoose.model('Menu', menuSchema)

export default MenuModel
