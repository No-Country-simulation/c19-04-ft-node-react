import MenuModel from '../models/menu.model.js'
import logger from '../utils/logger.js'

export const getMenu = async (req, res) => {
	try {
		const menu = await MenuModel.find()

		res.status(200).json(menu)
	} catch (error) {
		logger.error(`Error in menu.service.getMenu: ${error}`)
	}
}

export const getDishesByIds = async (ids) => {
	try {
		const dishes = await MenuModel.find({ _id: { $in: ids } })
		return dishes
	} catch (error) {
		logger.error(`Error in menu.service.getDishById: ${error}`)
	}
}
