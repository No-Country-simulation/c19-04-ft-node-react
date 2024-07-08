import Ingredients from '../models/ingredients.model.js'
import logger from '../utils/logger.js'

export const addIngredient = async (req, res) => {
    try {
        const { ingredientName, quantity } = req.body
        if (!ingredientName) {
            logger.error('ingredientName field empty')
            res.status(403).json({ message: 'The name of the ingredient can not be empty' })
        }
        if (await Ingredients.findOne({ ingredientName: ingredientName })) {
            logger.error('The element already exists')
            return res.status(403).json({ message: 'The element that want to be added already exists' })
        }
        await Ingredients.create({
            ingredientName,
            quantity
        })
        logger.info(`Ingredient ${ingredientName} created successfully`)
        res.status(201).json(`Ingredient ${ingredientName} created successfully`)
    } catch (error) {
        logger.info(`The action triggers the error ${error}`)
        res.status(500).json('Internal Server Error')
    }
}
export const removeIngredient = async (req, res) => {
    console.log("hola")

}
export const updateIngredient = async (req, res) => {
    console.log("hola")

}
export const deleteIngredient = async (req, res) => {
    console.log("hola")

}