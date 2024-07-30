import IngredientModel from '../models/ingredients.model.js'
import logger from '../utils/logger.js'

class IngredientController {
	async addIngredient(ingredientName, quantity) {
		try {
			if (!ingredientName) {
				logger.error('ingredientName field empty')
				return { message: 'The name of the ingredient can not be empty' }
			}

			if (await IngredientModel.findOne({ ingredientName: ingredientName })) {
				logger.error('The element already exists')
				return { message: 'The element that want to be added already exists' }
			}

			await IngredientModel.create({
				ingredientName,
				quantity,
			})

			logger.info(`Ingredient ${ingredientName} created successfully`)
			return { message: `Ingredient ${ingredientName} created successfully` }
		} catch (err) {
			logger.info(
				`Error adding ingredient IngredientController.addIngredient: ${err}`,
			)
			throw new Error('Internal Server Error')
		}
	}

	async getIngredient() {
		try {
			const ingredients = await IngredientModel.find()

			if (ingredients.length === 0) {
				logger.error('No ingredients found')
				return { message: 'No ingredients found' }
			}

			logger.info('Ingredients retrieved successfully')
			return ingredients
		} catch (err) {
			logger.error(
				`Error getting ingredients IngredientController.getIngredient: ${err}`,
			)
			throw new Error('Internal Server Error')
		}
	}

	async removeIngredient(id) {
		try {
			await IngredientModel.findByIdAndDelete(id)

			logger.info('Ingredient deleted successfully')
			return { message: 'Ingredient deleted successfully' }
		} catch (err) {
			logger.error(
				`Error removing ingredient IngredientController.removeIngredient: ${err}`,
			)
			throw new Error('Internal Server Error')
		}
	}

	async updateIngredient(id, ingredientName, quantity) {
		try {
			await IngredientModel.findByIdAndUpdate(id, { ingredientName, quantity })

			logger.info('Ingredient updated successfully')
			return { message: 'Ingredient updated successfully' }
		} catch (err) {
			logger.error(
				`Error updating ingredient IngredientController.updateIngredient: ${err}`,
			)
			throw new Error('Internal Server Error')
		}
	}
}

export default new IngredientController()
