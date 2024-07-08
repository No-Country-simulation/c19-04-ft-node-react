import MenuModel from '../models/menu.model.js'
import logger from '../utils/logger.js'

//TODO: Implementar la lógica para obtener todos los modelos (drinks, dessert, starters, etc)
export const getCardMenu = async (req, res) => {
	try {
		const menu = await MenuModel.find()
		logger.info('Menu listed successfully.')
		res.status(200).json(menu)
	} catch (err) {
		logger.error(`Error in getCardMenu: ${err.message}`)
		res.status(500).send({ message: err.message })
	}
}
