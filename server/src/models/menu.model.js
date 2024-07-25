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
	category: {
		type: String,
		required: true,
		enum: ['Entradas', 'Platos principales', 'Postres', 'Bebidas', 'Alcohol'],
	},
	tags: {
		type: String,
		required: true,
		enum: [
			'Hamburguesas',
			'Pizzas',
			'Pastas',
			'Ensaladas',
			'Sushi',
			'Milanesas',
		],
	},
	imgUrl: {
		type: String,
		required: true,
	},
	ingredients: [],
	estimatedTime: {
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
