import IngredientModel from '../models/ingredients.model.js'
import logger from '../utils/logger.js'

export const addIngredient = async (req, res) => {
	try {
		const { ingredientName, quantity } = req.body
		if (!ingredientName) {
			logger.error('ingredientName field empty')
			res
				.status(403)
				.json({ message: 'The name of the ingredient can not be empty' })
		}
		if (await IngredientModel.findOne({ ingredientName: ingredientName })) {
			logger.error('The element already exists')
			return res
				.status(403)
				.json({ message: 'The element that want to be added already exists' })
		}
		await IngredientModel.create({
			ingredientName,
			quantity,
		})
		logger.info(`Ingredient ${ingredientName} created successfully`)
		res.status(201).json(`Ingredient ${ingredientName} created successfully`)
	} catch (err) {
		logger.info(`The action triggers the error ${err}`)
		res.status(500).json('Internal Server Error')
	}
}
export const getIngredient = async (req, res) => {
	try {
		const ingredients = await IngredientModel.find()

		if (ingredients.length === 0) {
			logger.error('No ingredients found')
			res.status(404).json({ message: 'No ingredients found' })
		}

		logger.info('Ingredients retrieved successfully')
		res.status(200).json(ingredients)
	} catch (err) {
		logger.error(`Error getting ingredients service.getIngredient: ${err}`)
	}
}

export const removeIngredient = async (req, res) => {
	const { id } = req.params

	try {
		await IngredientModel.findByIdAndDelete(id)

		logger.info('Ingredient deleted successfully')
		res.status(200).json({ message: 'Ingredient deleted successfully' })
	} catch (err) {
		logger.error(`Error removing ingredient service.removeIngredient: ${err}`)
	}
}
export const updateIngredient = async (req, res) => {
	const { id } = req.params
	const { ingredientName, quantity } = req.body

	try {
		await IngredientModel.findByIdAndUpdate(id, { ingredientName, quantity })
		res.status(200).json({ message: 'Ingredient updated successfully' })
	} catch (err) {
		logger.error(`Error updating ingredient service.updateIngredient: ${err}`)
	}
}
