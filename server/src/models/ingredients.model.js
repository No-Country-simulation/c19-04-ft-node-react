import mongoose from 'mongoose'

const ingredientSchema = new mongoose.Schema({
	ingredientName: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		default: 0,
	},
})

const IngredientModel = mongoose.model('Ingredients', ingredientSchema)

export default IngredientModel
